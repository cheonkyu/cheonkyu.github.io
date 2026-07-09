# Anti scraping

## 1. IP 주소 블랙리스트

## 2. 사용자 에이전트 및 기타 HTTP 헤더 필터링

### User-agent

```
User-Agent: Mozilla/5.0 (system-information>)
<플랫폼> (<플랫폼 세부정보>) <확장 프로그램>
```

```
Mozilla/5.0 (Linux; <Android 버전>; <빌드 태그 등>)AppleWebKit/<WebKit 버전>
(KHTML, like Gecko) Chrome/<Chrome 버전>Mobile Safari/<WebKit 버전>
```

```
Mozilla/5.0 (Linux; <Android 버전>; <빌드 태그 등>)AppleWebKit/<WebKit Rev>
(KHTML, like Gecko) Chrome/<Chrome Rev>Safari/<WebKit Rev>
```

https://www.networkinghowtos.com/howto/common-user-agent-list/

#### User-Agent 샘플

| 기기 / 브라우저 / 봇 이름                  | User-Agent 문자열                                                                                                                                                       |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lynx**                                   | `Lynx/2.8.8pre.4 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/2.12.23`                                                                                                            |
| **Wget**                                   | `Wget/1.15 (linux-gnu)`                                                                                                                                                 |
| **Curl**                                   | `curl/7.35.0`                                                                                                                                                           |
| **HTC**                                    | `Mozilla/5.0 (Linux; Android 7.0; HTC 10 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36`                                 |
| **Google Nexus**                           | `Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7`                    |
| **삼성 갤럭시 노트 4**                     | `Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-N910F Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36` |
| **삼성 갤럭시 노트 3**                     | `Mozilla/5.0 (Linux; Android 5.0; SAMSUNG SM-N900 Build/LRX21V) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.1 Chrome/34.0.1847.76 Mobile Safari/537.36`     |
| **삼성 폰**                                | `Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G570Y Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36` |
| **Bing의 검색 엔진 봇**                    | `Mozilla/5.0 (호환 가능; bingbot/2.0; +http://www.bing.com/bingbot.htm)`                                                                                                |
| **Google의 검색 엔진 봇**                  | `Mozilla/5.0 (호환 가능; Googlebot/2.1; +http://www.google.com/bot.html)`                                                                                               |
| **Apple iPhone**                           | `Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1`                             |
| **Apple iPad**                             | `Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4`                                       |
| **Microsoft Internet Explorer 11 / IE 11** | `Mozilla/5.0 (호환, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko`                                                                                          |
| **Microsoft Internet Explorer 10 / IE 10** | `Mozilla/5.0 (호환 가능; MSIE 10.0; Windows NT 6.2; Trident/6.0; MDDCJS)`                                                                                               |
| **Microsoft Internet Explorer 9 / IE 9**   | `Mozilla/5.0 (호환; MSIE 9.0; Windows NT 6.0; Trident/5.0; Trident/5.0)`                                                                                                |
| **Microsoft Internet Explorer 8 / IE 8**   | `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)`                    |
| **Microsoft Internet Explorer 7 / IE 7**   | `Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)`                                                                                                             |
| **Microsoft Internet Explorer 6 / IE 6**   | `Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)`                                                                                                               |
| **Microsoft Edge**                         | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`                                      |
| **Mozilla Firefox**                        | `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0`                                                                                        |
| **Google Chrome**                          | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36`                                                   |

### Referer header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referer

### Accept-Language

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language

### Accept-Encoding

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding

### Connection

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Connection

## 3. 자바스크립트 챌린지

![Javascript-challenges-example](https://media.brightdata.co.kr/2024/10/Javascript-challenges-example.png)

## 4. CAPTCHA 도전 과제

![CAPTCHA-example](https://media.brightdata.co.kr/2024/10/CAPTCHA-example.png)

Cloudflare 및 Akamai와 같은 많은 CDN(콘텐츠 전송 네트워크) 서비스는 이제 봇 방지 기능에 CAPTCHA를 통합

## 5. 허니팟 트랩

- 가시적 콘텐츠와 숨겨진 콘텐츠를 구분하지 못하는 단순한 봇을 식별하고 차단하는 간단하면서도 효과적인 방법

- 웹 페이지의 HTML 구조를 세심하게 분석하고 "display: none" 이나 "visibility: hidden"과 같은 속성을 가진 요소처럼 인간 사용자에게 보이지 않는 요소와의 상호작용을 피해함

## 6. 행동 분석

- 행동 분석은 시간 경과에 따른 사용자 행동을 모니터링하여 자동화된 스크래핑을 나타내는 패턴을 탐지하는 것을 포함
- 봇은 규칙적인 간격으로 요청을 보내거나, 비정상적인 탐색 경로를 따르거나, 특정 순서로 페이지를 접근하는 등 예측 가능하고 반복적인 행동을 보입니다. 웹사이트는 또한 세션 길이, 마우스 움직임, 상호작용 타이밍 등의 요소를 분석하여 비인간적 활동을 식별

## 7. 브라우저 지문 인식

- 웹사이트가 화면 해상도, 운영 체제, 언어, 시간대, 설치된 확장 프로그램, 글꼴 등 브라우저 정보를 수집하는 기술

- 웹사이트는 스크레이퍼를 추적하고 차단하는 데 사용할 수 있는 기기 고유 식별자를 생성할 수 있습니다.

- 브라우저 지문 인식을 피하려면 이러한 특성을 무작위화하여 웹사이트가 일관된 지문을 생성하기 어렵게 만들 수 있습니다. 이를 위해 IP 주소를 자주 변경하고, 다양한 요청 헤더(다양한 User-Agent 포함)를 사용하며, 헤드리스 브라우저를 설정하여 다양한 화면 크기, 해상도 및 글꼴을 사용하도록 할 수 있습니다.

## Reference

1. [2026년 가장 인기 있는 스크래핑 방지 기술](https://brightdata.co.kr/blog/web-data/anti-scraping-techniques?_gl=1*1brfnbs*_gcl_au*MTM4Njg3NTU2NC4xNzgzNTk4OTcz*_ga*MjEyNTQ3NjIyMS4xNzgzNTk4OTc0*_ga_KQX3XWKR2T*czE3ODM1OTg5NzMkbzEkZzEkdDE3ODM1OTkyNDIkajQ2JGwwJGgw)

2. [웹 스크래핑을 위한 사용자 에이전트 101](https://brightdata.co.kr/blog/how-tos/user-agents-for-web-scraping-101)
