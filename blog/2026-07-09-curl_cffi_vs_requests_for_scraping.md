# requests보다 curl_cffi가 웹 스크래핑에 유리한 이유

## 1. 핵심 요약: 둘의 가장 큰 차이는 "누구처럼 보이느냐"

```mermaid
flowchart LR
    subgraph Client["클라이언트"]
        R["requests"]
        C["curl_cffi"]
    end

    subgraph Server["서버"]
        BD["봇 탐지 시스템"]
        OK["정상 응답"]
    end

    R -->|HTTP/1.1<br/>기본 TLS 지문| BD
    C -->|HTTP/2, HTTP/3<br/>Chrome/Safari 지문| OK

    style R fill:#ffcccc
    style C fill:#ccffcc
```

| 항목                     | `requests` | `curl_cffi` |
| ------------------------ | ---------- | ----------- |
| HTTP/1.1                 | ✅         | ✅          |
| HTTP/2                   | ❌         | ✅          |
| HTTP/3                   | ❌         | ✅          |
| TLS/JA3 지문 조작        | ❌         | ✅          |
| HTTP/2 지문(Akamai) 조작 | ❌         | ✅          |
| 비동기(async)            | ❌         | ✅          |
| 웹소켓                   | ❌         | ✅          |
| 연결 재사용(pool)        | 제한적     | 강력        |
| 속도                     | 느림       | 빠름        |

`requests`는 "편하게 HTTP 요청을 보내는 도구"입니다.  
`curl_cffi`는 "브라우저처럼 보이면서 빠르게 많은 요청을 보내는 도구"입니다.

스크래핑에서 가장 걸림돌은 **서버가 봇으로 감지하고 차단**하는 것입니다.  
`curl_cffi`는 이 차단을 줄이는 데 초점이 맞춰진 도구입니다.

---

## 2. 왜 서버는 봇을 감지할까? — 지문(fingerprint) 개념

서버는 단순히 "요청이 온다"는 것만 보지 않습니다. 클라이언트가 어떤 프로그램인지 추측하는 단서를 모읍니다.

대표적인 단서 두 가지:

### 2.1 TLS 핸드셰이크 지문 (JA3)

```mermaid
sequenceDiagram
    participant Client as 클라이언트
    participant Server as 서버

    Client->>Server: ClientHello (TLS 버전 + 암호 + 확장 목록)
    Server->>Server: JA3 해시로 지문 생성
    Server-->>Client: ServerHello
    Note over Server: "이 JA3은 Python requests 것과 같다"
```

HTTPS 연결을 시작할 때 클라이언트는 서버에게 다음 정보를 보냅니다.

- 사용하는 TLS 버전
- 지원하는 암호 목록(ciphers)
- TLS 확장 목록과 순서
- 타원곡선 목록 등

이 조합을 모아 해시값 하나로 만들면 **JA3**이라고 합니다.

예시:

```
Firefox JA3   → abcd1234...
Chrome JA3    → efgh5678...
Python requests JA3 → xyz9999...
```

서버가 자주 보는 값이면 "이건 브라우저가 아니네"라고 의심할 수 있습니다.

### 2.2 HTTP/2 지문 (Akamai fingerprint)

HTTP/2 연결에서도 서버는 다음을 관찰합니다.

- HTTP/2 설정 프레임의 각종 값
- 윈도우 업데이트 크기
- 의사헤더(pseudo-header) 순서: `:method`, `:authority`, `:scheme`, `:path`

이 조합을 모아 **Akamai fingerprint**라고 부릅니다.

브라우저는 각각 일정한 패턴을 가집니다. 반면 Python의 HTTP 클라이언트는 다른 패턴을 보이므로 봇 탐지 규칙에 걸리기 쉽습니다.

---

## 3. curl_cffi는 어떻게 지문을 위조할까?

`curl_cffi`는 내부에서 `curl-impersonate`라는 특수한 libcurl을 사용합니다.  
이 libcurl은 브라우저의 TLS/HTTP2/HTTP3 지문을 그대로 흉내 내도록 패치되어 있습니다.

### 3.1 impersonate 파라미터 하나로 브라우저가 되기

```python
import curl_cffi

r = curl_cffi.get(
    "https://tls.browserleaks.com/json",
    impersonate="chrome"
)
```

이 한 줄이 실제로 하는 일을 코드로 따라가 보겠습니다.

### 3.2 코드 분석: impersonate 옵션 처리

```mermaid
flowchart TD
    A[impersonate="chrome"] --> B{native target?}
    B -->|예| C[resolve_latest_browser_type
chrome146]
    B -->|아니오| D[load named fingerprint]
    C --> E[curl_easy_impersonate]
    D --> F[_apply_fingerprint]
    E --> G[TLS/HTTP2/HTTP3<br/>지문 설정 완료]
    F --> G
```

`curl_cffi/requests/session.py`의 `request()` 메서드는 요청할 때마다 `set_curl_options()`를 호출합니다.

```python
# curl_cffi/requests/session.py (일부)
if impersonate:
    if isinstance(impersonate, Fingerprint):
        _apply_fingerprint(c, impersonate, existing_header_names, default_headers)
    else:
        if _is_native_impersonate_target(impersonate):
            normalized = resolve_latest_browser_type(impersonate)
            ret = c.impersonate(normalized, default_headers=default_headers)
        else:
            fingerprint = _load_named_fingerprint(impersonate)
            _apply_fingerprint(c, fingerprint, ...)
```

여기서 `c.impersonate()`는 낮은 레벨의 `Curl` 객체 메서드입니다.

`curl_cffi/curl.py`:

```python
# curl_cffi/curl.py
class Curl:
    ...
    def impersonate(self, target: str, default_headers: bool = True) -> int:
        if self._curl is None:
            return 0
        return lib.curl_easy_impersonate(
            self._curl, target.encode(), int(default_headers)
        )
```

`lib.curl_easy_impersonate`는 C로 구현된 `curl-impersonate` 함수입니다.  
이 함수가 실제로 TLS 확장 순서, 암호 목록, HTTP/2 설정 등을 조정합니다.

### 3.3 사전 설정 목록

`curl_cffi/fingerprints.py`에는 30개 이상의 기본 브라우저 사본이 등록되어 있습니다.

```python
NATIVE_IMPERSONATE_TARGETS = [
    {"browser": "Chrome", "version": "146", "target_name": "chrome146", ...},
    {"browser": "Safari", "version": "26.0.1", "target_name": "safari2601", ...},
    {"browser": "Firefox", "version": "147", "target_name": "firefox147", ...},
    ...
]
```

`impersonate="chrome"`이라고 쓰면 내부적으로 `chrome146` 같은 최신 버전으로 해석됩니다.  
구체적인 버전을 쓰고 싶으면 `impersonate="chrome124"`처럼 사용할 수도 있습니다.

### 3.4 직접 지문 문자열을 넣기

JA3 문자열이나 Akamai 문자열을 직접 넣어 더 세밀하게 조작할 수도 있습니다.

```python
curl_cffi.get(
    url,
    ja3="771,4865-4866-4867-49195-49199...",
    akamai="1:65536;2:0;4:6291456;3:1000|10485760|0|m,a,s,p"
)
```

`curl_cffi/requests/utils.py`의 `set_ja3_options()`는 JA3 문자열을 쪼개 각 항목을 curl 옵션에 매핑합니다.

```python
def set_ja3_options(curl: Curl, ja3: str, permute: bool = False):
    tls_version, ciphers, extensions, curves, curve_formats = ja3.split(",")

    curl_tls_version = TLS_VERSION_MAP[int(tls_version)]
    curl.setopt(CurlOpt.SSLVERSION, curl_tls_version | CurlSslVersion.MAX_DEFAULT)

    cipher_names = []
    for cipher in ciphers.split("-"):
        cipher_id = int(cipher)
        cipher_name = TLS_CIPHER_NAME_MAP.get(cipher_id)
        cipher_names.append(cipher_name)
    curl.setopt(CurlOpt.SSL_CIPHER_LIST, ":".join(cipher_names))

    extension_ids = set(int(e) for e in extensions.split("-"))
    toggle_extensions_by_ids(curl, extension_ids)
    curl.setopt(CurlOpt.TLS_EXTENSION_ORDER, extensions)

    curve_names = []
    for curve in curves.split("-"):
        curve_name = TLS_EC_CURVES_MAP[int(curve)]
        curve_names.append(curve_name)
    curl.setopt(CurlOpt.SSL_EC_CURVES, ":".join(curve_names))
```

`set_akamai_options()`도 비슷하게 HTTP/2 설정과 의사헤더 순서를 분해합니다.

```python
def set_akamai_options(curl: Curl, akamai: str):
    settings, window_update, streams, header_order = akamai.split("|")
    curl.setopt(CurlOpt.HTTP_VERSION, CurlHttpVersion.V2_0)
    curl.setopt(CurlOpt.HTTP2_SETTINGS, settings)
    curl.setopt(CurlOpt.HTTP2_WINDOW_UPDATE, int(window_update))
    curl.setopt(CurlOpt.HTTP2_PSEUDO_HEADERS_ORDER, header_order.replace(",", ""))
```

이런 세밀한 제어는 `requests`로는 불가능합니다.

---

## 4. HTTP/2, HTTP/3 지원의 의미

현대 웹사이트 대부분은 HTTP/2를 사용합니다. HTTP/3(QUIC)도 점차 늘고 있습니다.

| 클라이언트 | HTTP/2 | HTTP/3 |
| ---------- | ------ | ------ |
| requests   | ❌     | ❌     |
| curl_cffi  | ✅     | ✅     |

`requests`는 기본적으로 HTTP/1.1만 사용합니다.  
HTTP/2 요청을 보내는 기능이 없으므로, "이 클라이언트는 브라우저가 아니다"라는 신호를 또 하나 보내는 셈입니다.

`curl_cffi`는 `CurlHttpVersion` 상수로 HTTP/2, HTTP/3를 직접 선택할 수 있습니다.

```python
class CurlHttpVersion(IntEnum):
    V1_0 = 1
    V1_1 = 2
    V2_0 = 3
    V2_PRIOR_KNOWLEDGE = 5
    V3 = 30
    V3ONLY = 31
```

실제 요청 전에 `set_curl_options()`에서 `HTTP_VERSION` 옵션을 설정합니다.

```python
# curl_cffi/requests/utils.py
if http_version:
    http_version = normalize_http_version(http_version)
    c.setopt(CurlOpt.HTTP_VERSION, http_version)
```

HTTP/3까지 지원하면 스크래핑 대상이 HTTP/3 전용 인프라를 쓸 때도 대응할 수 있습니다.

---

## 5. 비동기와 연결 풀: 많은 요청을 빠르게

스크래핑은 보통 한두 번 요청으로 끝나지 않습니다. 수천~수만 개의 페이지를 가져와야 합니다.

### 5.1 requests의 한계

`requests`는 동기(sync) 라이브러리입니다.

```python
import requests

for url in urls:
    r = requests.get(url)  # ← 한 요청이 끝날 때까지 다음 요청 대기
```

요청 하나가 끝나야 다음 요청을 보낼 수 있어 시간이 오래 걸립니다.  
`concurrent.futures`나 멀티스레딩으로 어느 정도 극복할 수 있지만, 쉽지 않습니다.

### 5.2 curl_cffi AsyncSession

```mermaid
flowchart TD
    subgraph Pool["AsyncSession 연결 풀"]
        C1[Curl handle 1]
        C2[Curl handle 2]
        C3[...]
        CN[Curl handle N]
    end

    T1[요청 A] -->|pop_curl| C1
    T2[요청 B] -->|pop_curl| C2
    C1 -->|release_curl<br/>reset + push| Pool
    C2 -->|release_curl| Pool

    style Pool fill:#e6f3ff
```

`curl_cffi`는 `AsyncSession`을 제공합니다.

```python
import asyncio
from curl_cffi import AsyncSession

async def main():
    async with AsyncSession() as s:
        tasks = [s.get(url) for url in urls]
        results = await asyncio.gather(*tasks)

asyncio.run(main())
```

`AsyncSession`은 내부적으로 **연결 풀(pool)**을 유지합니다.

```python
# curl_cffi/requests/session.py
class AsyncSession(BaseSession[R]):
    def init_pool(self):
        self.pool: asyncio.LifoQueue[Curl | None] = asyncio.LifoQueue(self.max_clients)
        while True:
            try:
                self.pool.put_nowait(None)
            except asyncio.QueueFull:
                break

    async def pop_curl(self) -> Curl:
        curl: Curl | None = await self.pool.get()
        if curl is None:
            curl = Curl(cacert=self.acurl._cacert, debug=self.debug)
        return curl

    def push_curl(self, curl: Curl | None) -> None:
        with suppress(asyncio.QueueFull):
            self.pool.put_nowait(curl)
```

- `None`은 "새로 만들 수 있는 빈자리"를 의미합니다.
- 요청이 들어오면 풀에서 기존 `Curl` 객체를 꺼내거나 새로 만듭니다.
- 요청이 끝나면 `release_curl()`로 객체를 초기화하고 다시 풀에 넣습니다.

이 덕분에 TCP/TLS 핸드셰이크를 반복하지 않고 기존 연결을 재사용할 수 있습니다.

### 5.3 AsyncCurl: asyncio와 libcurl 연결

`AsyncSession` 아래에는 `AsyncCurl` 클래스가 있습니다.  
이 클래스는 libcurl의 `curl_multi`를 asyncio 이벤트 루프와 연결합니다.

```python
# curl_cffi/aio.py
class AsyncCurl:
    def __init__(self, cacert: str = "", loop=None):
        self._curlm = lib.curl_multi_init()
        self._curl2future: dict[Curl, asyncio.Future] = {}
        self._sockfds: set[int] = set()
        self.loop = get_selector(loop if loop is not None else asyncio.get_running_loop())
        self._timeout_checker = self.loop.create_task(self._force_timeout())
```

`AsyncCurl`은 다음과 같은 방식으로 동작합니다.

1. `add_handle(curl)`로 요청을 등록합니다.
2. libcurl이 소켓 이벤트를 알려주면 asyncio의 `add_reader`/`add_writer`에 등록합니다.
3. 데이터가 들어오면 `process_data()`가 완료 여부를 확인하고 `Future`를 해결합니다.

이 구조는 "스레드 하나당 연결 하나"가 아니라 **단일 이벤트 루프에서 수천 개의 연결을 동시에 관리**할 수 있게 합니다.

---

## 6. 속도 비교

```mermaid
xychart-beta
    title "단일 워커 1000회 요청 소요 시간 (초)"
    x-axis ["requests", "curl_cffi_sync"]
    y-axis "시간(초)" 0 --> 2
    bar [1.6857, 0.6563]
```

`benchmark/single_worker.csv` 파일에 실측 결과가 있습니다.

| 클라이언트     | 1 KB  | 20 KB | 200 KB |
| -------------- | ----- | ----- | ------ |
| requests       | 1.69s | 1.69s | 1.84s  |
| curl_cffi_sync | 0.66s | 0.67s | 1.55s  |
| pycurl         | 0.45s | 0.46s | 1.07s  |

`requests`는 단일 워커에서 가장 느립니다.  
`curl_cffi`는 비슷한 Pythonic API를 유지하면서도 훨씬 빠릅니다.

비동기를 활용하면 동시 요청 수를 늘려 차이는 더 커집니다.

---

## 7. 웹소켓, 프록시, 기타 스크래핑 기능

### 7.1 웹소켓

`requests`는 웹소켓을 지원하지 않습니다.  
`curl_cffi`는 동기/비동기 웹소켓을 모두 지원합니다.

```python
from curl_cffi import AsyncSession

async with AsyncSession() as session:
    async with session.ws_connect("wss://echo.websocket.org") as ws:
        await ws.send_str("Hello")
        async for message in ws:
            print(message)
```

`curl_cffi/requests/session.py`의 `ws_connect()` 메서드는 내부적으로 `CurlOpt.CONNECT_ONLY` 옵션을 사용해 libcurl의 웹소켓 모드로 전환합니다.

### 7.2 프록시

프록시는 스크래핑에서 IP 로테이션에 필수적입니다.

```python
curl_cffi.get(url, proxy="http://user:pass@proxy:3128")
```

`set_curl_options()`에서는 다음과 같이 프록시를 처리합니다.

```python
# curl_cffi/requests/utils.py
if proxy is not None:
    c.setopt(CurlOpt.PROXY, proxy)
    if parts.scheme == "https" and not proxy.startswith("socks"):
        c.setopt(CurlOpt.HTTPPROXYTUNNEL, 1)
    if proxy_auth:
        c.setopt(CurlOpt.PROXYUSERNAME, username.encode())
        c.setopt(CurlOpt.PROXYPASSWORD, password.encode())
```

SOCKS5 프록시를 통한 HTTP/3도 지원합니다.

---

## 8. requests를 써도 될 때와 curl_cffi가 필요할 때

### requests로 충분한 경우

- 단순 API 호출
- 내부 서버끼리 통신
- 봇 탐지가 없는 사이트
- HTTP/1.1만 지원하는 서비스

### curl_cffi가 필요한 경우

- Cloudflare, Akamai, DataDome 등 봇 방어가 있는 사이트
- HTTP/2 또는 HTTP/3를 요구하는 서버
- 브라우저 지문을 맞춰야 하는 경우
- 대량 비동기 수집
- 웹소켓 기반 실시간 데이터 수집

---

## 9. 마무리

`requests`는 훌륭한 HTTP 라이브러리이지만, **브라우저처럼 보이는 요청**과 **대규모 비동기 수집**에 특화되어 있지 않습니다.

`curl_cffi`는 다음 세 가지를 동시에 제공합니다.

1. **브라우저 지문 위조**: JA3, HTTP/2, HTTP/3 fingerprint까지 조작
2. **빠른 비동기 처리**: libcurl 기반 연결 풀 + asyncio 통합
3. **풍부한 기능**: 웹소켓, 프록시, HTTP/3, 재시도 전략 등

스크래핑이 단순한 다운로드가 아니라 "서버의 의심을 피해 데이터를 가져오는 것"이라는 관점에서 보면, `curl_cffi`가 훨씬 유리한 선택입니다.
