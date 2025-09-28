# Nestjs Deep Dive

https://docs.nestjs.com/first-steps

## 1. `main.ts` (entry point)

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- `NestFactory.create(AppModule)` → **NestApplication 인스턴스 생성**
- `app.listen(3000)` → 내부적으로 Express/Fastify 서버 실행

즉, Nest 애플리케이션의 **진입점**.

---

## 2. `NestFactory`

https://github.com/cheonkyu/nest/blob/master/packages/core/nest-factory.ts#L383-L396

```ts
export const NestFactory = new NestFactoryStatic();
```

- `NestFactory`는 **싱글톤 인스턴스**
- 개발자가 `NestFactory.create()`를 호출하면 내부적으로 `NestFactoryStatic.create()` 실행됨

---

## 3. `NestFactoryStatic.create()`

https://github.com/cheonkyu/nest/blob/master/packages/core/nest-factory.ts#L79-L113

### 주요 단계

```ts
public async create<T extends INestApplication = INestApplication>(
  moduleCls: IEntryNestModule,
  serverOrOptions?: AbstractHttpAdapter | NestApplicationOptions,
  options?: NestApplicationOptions,
): Promise<T> {
  // 1. HTTP 어댑터 초기화
  const [httpServer, appOptions] = this.isHttpServer(serverOrOptions!)
    ? [serverOrOptions, options]
    : [this.createHttpAdapter(), serverOrOptions];

  // 2. 기본 설정 객체 준비
  const applicationConfig = new ApplicationConfig();
  const container = new NestContainer(applicationConfig, appOptions);
  const graphInspector = this.createGraphInspector(appOptions!, container);

  // 3. 로거 및 에러 핸들링 설정
  this.setAbortOnError(serverOrOptions, options);
  this.registerLoggerConfiguration(appOptions);

  // 4. 컨테이너와 모듈 초기화
  await this.initialize(
    moduleCls,
    container,
    graphInspector,
    applicationConfig,
    appOptions,
    httpServer,
  );

  // 5. NestApplication 인스턴스 생성
  const instance = new NestApplication(
    container,
    httpServer,
    applicationConfig,
    graphInspector,
    appOptions,
  );

  // 6. 프록시 생성 (메서드 위임)
  const target = this.createNestInstance(instance);
  return this.createAdapterProxy<T>(target, httpServer);
}
```

정리하면:

1. **HTTP 서버 어댑터 결정**

   - 사용자가 `new FastifyAdapter()` 같은 걸 넘기면 그대로 사용
   - 없으면 `createHttpAdapter()` → `ExpressAdapter` 기본 사용

2. **DI 컨테이너 초기화**

   - `NestContainer` 생성 → 모듈/프로바이더 등록 및 관리

3. **그래프 인스펙터**

   - 의존성 그래프 추적/검사 도구 (`--debug` 옵션 등에 활용)

4. **초기화 과정**

   - `initialize()` → 모듈 로딩, 의존성 주입, 라이프사이클 훅 실행

5. **NestApplication 생성**

   - 컨테이너 + 어댑터 조합된 앱 객체

6. **Proxy 래핑**

   - 최종적으로 반환되는 `app`은 Proxy → Express/Fastify 메서드를 직접 호출 가능 (`app.getHttpServer().get(...)` 대신 `app.get(...)` 등)

---

## 4. `createHttpAdapter`

https://github.com/cheonkyu/nest/blob/master/packages/core/nest-factory.ts#L318-L325

```ts
private createHttpAdapter<T = any>(httpServer?: T): AbstractHttpAdapter {
  const { ExpressAdapter } = loadAdapter(
    '@nestjs/platform-express',
    'HTTP',
    () => require('@nestjs/platform-express'),
  );
  return new ExpressAdapter(httpServer);
}
```

- NestJS는 **플랫폼 독립적**이므로, 기본은 `ExpressAdapter`
- Fastify를 쓰려면 `@nestjs/platform-fastify` 설치 후 `FastifyAdapter` 넘기면 됨
- 이렇게 해서 Nest는 **어댑터 기반의 추상화된 HTTP 계층**을 제공

---

## 5. `createAdapterProxy`

```ts
private createAdapterProxy<T>(app: NestApplication, adapter: HttpServer): T {
  const proxy = new Proxy(app, {
    get: (receiver: Record<string, any>, prop: string) => {
      const mapToProxy = (result: unknown) => {
        return result instanceof Promise
          ? result.then(mapToProxy)
          : result instanceof NestApplication
            ? proxy
            : result;
      };

      // (1) app에 없는 속성인데 adapter에 있으면 → adapter 메서드 호출
      if (!(prop in receiver) && prop in adapter) {
        return (...args: unknown[]) => {
          const result = this.createExceptionZone(adapter, prop)(...args);
          return mapToProxy(result);
        };
      }

      // (2) app의 메서드라면 실행 후 proxy 매핑
      if (isFunction(receiver[prop])) {
        return (...args: unknown[]) => {
          const result = receiver[prop](...args);
          return mapToProxy(result);
        };
      }

      // (3) 일반 프로퍼티는 그냥 반환
      return receiver[prop];
    },
  });
  return proxy as unknown as T;
}
```

### 동작 방식

- `Proxy` 객체로 `app`을 감쌈
- NestApplication에 없는 속성을 호출하면 → Express/Fastify 어댑터의 메서드로 위임

  - 예: `app.get()` (NestApplication에는 없음 → Express `get()` 실행됨)

- Nest API와 HTTP 서버 API를 자연스럽게 합쳐줌

즉, `NestApplication`과 `Express/Fastify` API를 **하나의 객체처럼 보이게 함**.

---

## 최종 정리

NestJS 부트스트랩 과정은 크게 **6단계**:

1. `NestFactory.create(AppModule)` 호출
2. HTTP 어댑터(Express/Fastify) 결정
3. `NestContainer` 초기화 (DI 컨테이너, 모듈 등록)
4. 모듈 초기화 및 의존성 주입 완료
5. `NestApplication` 생성
6. `Proxy`로 Nest와 Express/Fastify API 연결 후 반환

이후 `app.listen(3000)` 하면 내부적으로 Express/Fastify 서버가 실행되고, Nest 컨테이너에 등록된 컨트롤러들이 라우팅에 연결됨.
