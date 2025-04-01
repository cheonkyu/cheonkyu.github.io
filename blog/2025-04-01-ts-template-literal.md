# 타입스크립트, 문자열 템플릿 리터럴 형식

타입스크립트의 문자열 템플릿 리터럴 형식을 이용한 프로젝트

- [TSpell](https://github.com/kkuchta/TSpell) : 철자검사기
- [ts-sql](https://github.com/codemix/ts-sql) : SQL 파서

## 사용자 정의 이벤트 시스템 정의하기

Q. 사용자 정의 이벤트 시스템을 만들 때 모든 이벤트명은 "on"으로 시작하도록 이름 규칙을 정하려고 함
A. 문자열 템플릿 리터럴 형식을 이용해 문자열 패턴을 기술

```ts
type EventName = `on${string}`; // "on"으로 시작하는 문자열 타입
type EventObject<T> = {
  val: T;
};

type Callback<T = any> = (ev: EventObject<T>) => void;
type Events = {
  [x: EventName]: Callback[] | undefined;
};

class EventSystem {
  events: Events;
  constructor() {
    this.events = {};
  }

  defineEventHandler(name: EventName, callback: Callback): void {
    this.events[name] = this.events[name] ?? [];
    this.events[name]?.push(callback);
  }

  trigger(name: EventName, value: any) {
    const callbacks = this.events[name];
    if (callbacks) {
      callbacks.forEach((cb) => {
        cb({ val: value });
      });
    }
  }
}

const system = new EventSystem();
system.defineEventHandler("onClick", (value) => {
  console.log("onClick", value);
});
system.trigger("onClick", "test");
```

## 문자열 조작 형식과 키 매핑으로 이벤트 콜백 만들기

Q. 아무 객체를 받아 각 프로퍼티에 watch 함수를 제공해서 이벤트 콜백을 정의하도록 허용하려 한다.
A. 키 매핑을 이용해 새 문자열 프로퍼티 키를 만듬. 와쳐 함수가 적절한 camel case 를 사용하도록 문자열 조작

다음 코드처럼 프로퍼티가 변경이 되면 감지할 수 있게 구현하고 싶음

```ts
const system = new EventSystem();

let person = {
  name: "kim",
  age: 90,
};
const watchedPerson = system.watch(person);
watchedPerson.onAgeChanged((event) => {
  console.log(event.val, "changed");
});

watchedPerson.age = 91;
```

```ts
type EventName = `on${string}`; // "on"으로 시작하는 문자열 타입
type EventObject<T> = {
  val: T;
};

type Callback<T = any> = (ev: EventObject<T>) => void;
type Events = {
  [x: EventName]: Callback[] | undefined;
};

function handleName(name: string): EventName {
  function capitalize(inp: string) {
    return inp.charAt(0).toUpperCase() + inp.slice(1);
  }
  return `on${capitalize(name)}Changed` as EventName;
}

class EventSystem {
  events: Events;
  constructor() {
    this.events = {};
  }

  defineEventHandler(name: EventName, callback: Callback): void {
    this.events[name] = this.events[name] ?? [];
    this.events[name]?.push(callback);
  }

  trigger(name: EventName, value: any) {
    const callbacks = this.events[name];
    if (callbacks) {
      callbacks.forEach((cb) => {
        cb({ val: value });
      });
    }
  }

  watch<T extends object>(obj: T): T & WatchedObject<T> {
    const self = this;
    return new Proxy(obj, {
      get(target, property) {
        if (
          typeof property === "string" &&
          property.startsWith("on") &&
          property.endsWith("Changed")
        ) {
          return (callback: Callback) => {
            self.defineEventHandler(property as EventName, callback);
          };
        }
        return target[property as keyof T];
      },
      set(target, property, value) {
        if (property in target && typeof property === "string") {
          target[property as keyof T] = value;
          self.trigger(handleName(property), value);
          return true;
        }
        return false;
      },
    }) as T & WatchedObject<T>;
  }
}

type WatchedObject<T> = {
  [K in string & keyof T as `on${Capitalize<K>}Changed`]: (
    ev: Callback<T[K]>
  ) => void;
};
type Person = {
  name: string;
  age: number;
};

// type WatchedPerson = {
//     onNameChanged: (ev: Callback<string>) => void;
//     onAgeChanged: (ev: Callback<number>) => void;
// }
type WatchedPerson = WatchedObject<Person>;

const system = new EventSystem();

let person = {
  name: "kim",
  age: 90,
};
const watchedPerson = system.watch(person);
watchedPerson.onAgeChanged((event) => {
  console.log(event.val, "changed");
});

watchedPerson.age = 91;
```

## 템플릿 리터럴을 구분자로 사용하기

Q. 벡엔드 요청 상태를 pending에서 error나 success로 변경하는 상태 머신을 모델링, 다양한 벡엔드 요청에 이들 상태를 적용하면서 내부 형식은 하나로 유지해야함
A. 문자열 템플릿 리터럴을 구별된 유니온의 구별자로 사용

```ts
type User = {};
type Order = {};
type Data = {
  user: User | null;
  order: Order | null;
};
type RequestConstants = keyof Data;

type Pending = {
  state: `${Uppercase<RequestConstants>}_PENDING`;
};

type Err = {
  state: `${Uppercase<RequestConstants>}_ERROR`;
  message: string;
};

// type Success = {
//     state: `${Uppercase<RequestConstants>}_SUCCESS`,
//     data: NonNullable<Data[RequestConstants]>
// }
type Success = {
  [K in RequestConstants]: {
    state: `${Uppercase<K>}_SUCCESS`;
    data: NonNullable<Data[K]>;
  };
}[RequestConstants];

type BackendRequest = Pending | Err | Success;
```
