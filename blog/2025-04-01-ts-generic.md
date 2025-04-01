# 타입스크립트 제네릭

## 함수 시그니처 일반화하기

Q. 같은 기능을 수행하지만 서로 다른 형식(호환되지 않음)을 취급하는 두 함수가 있음
A. 제네릭으로 동작을 일반화

```ts
type Languages = {
  en: URL;
  kr: URL;
};

type AllowedElements = {
  video: string;
};

// in 키워드를 이용하기 위해 extends Object 해줌
function isAvailable<T extends Object>(
  target: T,
  key: string | number | symbol
): key is keyof T {
  return key in target;
}

console.log(isAvailable({ en: "stet", kr: "st" }, "kr"));
console.log(isAvailable({ video: "test" }, "kr"));
```

## 관련된 함수 인수 만들기

Q. 첫번째 매개변수에 의존하는 두 번째 함수 매개변수를 구현하기
A. 제네릭 제약(generic constraint)를 이용

```ts
type Languages = {
  en: URL;
  kr: URL;
};

const languages = {
  en: "https://google.com",
  kr: "https://naver.com",
};

type URLList = {
  [x: string]: URL;
};

function fetchFile<List>(urls: List, key: keyof List) {
  // TODO
}

function fetchFiles<List>(urls: List, keys: (keyof List)[]) {
  // TODO
}
fetchFile(languages, "kr");
fetchFiles(languages, ["kr", "en"]);
```

## 형식 맵을 이용한 매핑 형식 사용하기

Q. 문자열 식별자에 기반한 특정 하위 형식의 객체를 만드는 팩토리 함수를 구현하는데, 다양한 하위 형식이 존재할 수 있는 상황
A. 모든 하위 형식에 형식 맵에 저장하고 인덱스로 접근할 수 있게 한 다음 Partial<T> 같은 매핑된 형식을 사용

```ts
// interface HTMLElementTagNameMap {
//     // 선언합치기
//     [x: string]: HTMLUnknownElement
// }

type AllElements = HTMLElementTagNameMap & {
  [x: `${string}-${string}`]: HTMLElement;
};

// function createElement<T extends keyof AllElements>(key: T, props?: Partial<AllElements[T]>) : AllElements[T] {
//     const el = document.createElement(key as string) as AllElements[T]
//     return Object.assign(el, props);
// }

// 별도로 정의한 타입 오버로딩
function createElement<T extends keyof AllElements>(
  key: T,
  props?: Partial<AllElements[T]>
): AllElements[T];
function createElement(tag: string, props?: Partial<HTMLElement>): HTMLElement {
  const el = document.createElement(tag as string) as HTMLElement;
  return Object.assign(el, props);
}

const a = createElement("a", { href: "test" });
const b = createElement("my-element");
```

## 새 객체 형식 생성하기

Q. 모델과 관련 있는 형식이 애플리케이션이 존재한다. 모델이 바뀔 때마다 형식도 바꿔야 한다.
A. 제네릭 매핑된 형식을 이용해 원래 형식에 기반한 새 객체 형식을 만듬

```ts
type ToyBase = {
  name: string;
  description: string;
  minimumAge: number;
};

type BoardGame = ToyBase & {
  kind: "boardgame";
  players: number;
};

type Doll = ToyBase & {
  kind: "doll";
  material: "plastic";
};

type Toy = Doll | BoardGame;

// type GroupedToys = {
//     boardgame: Toy[];
//     puzzle: Toy[];
//     doll: Toy[];
// }

type GroupedToys = {
  [k in Toy["kind"]]?: Toy[];
};

function groupToys(toys: Toy[]): GroupedToys {
  const groups: GroupedToys = {};
  for (let toy of toys) {
    groups[toy.kind] = groups[toy.kind] ?? [];
    groups[toy.kind]?.push(toy);
  }
  return groups;
}
```

```ts
type ToyBase = {
  name: string;
  description: string;
  minimumAge: number;
};

type BoardGame = ToyBase & {
  kind: "boardgame";
  players: number;
};

type Doll = ToyBase & {
  kind: "doll";
  material: "plastic";
};

type Toy = Doll | BoardGame;

// type GroupedToys = {
//     boardgame: Toy[];
//     puzzle: Toy[];
//     doll: Toy[];
// }

// Group 타입 정의하기
type Group<Collection, Selector extends keyof Collection> = {
  [k in Collection[Selector] extends string // Selector가 Collection의 유효한 키인지 판단
    ? Collection[Selector]
    : never]?: Collection[];
};
type GroupedToys = Partial<Group<Toy, "kind">>;

function groupToys(toys: Toy[]): GroupedToys {
  const groups: GroupedToys = {};
  for (let toy of toys) {
    groups[toy.kind] = groups[toy.kind] ?? [];
    groups[toy.kind]?.push(toy);
  }
  return groups;
}
```

## ThisType으로 객체의 this 정의하기

Q. 앱에서 여러 메서드를 포함하는 복잡한 설정 객체들을 처리하는데, 사용처에 따라 this의 컨텍스트가 달라짐
A. 내장 제네릭 ThisType<T>를 이용해 this를 올바르게 정의

Vuejs 같은 프레임워크는 많은 팩토리 함수에 의존

- data 함수 : 인스턴스 초기 데이터 반환
- computed 프로퍼티 : 계산된 프로퍼티 저장. 이들 함수는 일반 프로퍼티에 접근하듯이 초기 데이터에 접근 가능
- methods 프로퍼티 : 메서드는 호출할 수 있는 대상이며, 초기 데이터와 계산된 프로퍼티 모두 접근 가능

```ts
// Record<string, () => any>
// type FnObj = {
//   [name: string]: () => any;
// };
type FnObj = Record<string, () => any>;

// ReturnType<FunctionObj[K]>
// FunctionObj[K]가 반환하는 타입
type MapFnToProp<FunctionObj extends FnObj> = {
  [K in keyof FunctionObj]: ReturnType<FunctionObj[K]>;
};

type Options<Data, Computed extends FnObj, Methods> = {
  data(this: {}): Data;
  computed?: Computed & ThisType<Data>;
  methods?: Methods & ThisType<Data & MapFnToProp<Computed> & Methods>;
};

declare function create<Data, Computed extends FnObj, Methods>(
  options: Options<Data, Computed, Methods>
): any;

const instance = create({
  data() {
    return {
      firstName: "cheonkyu",
      lastName: "kim",
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} + ${this.lastName}`;
    },
  },
  methods: {
    hello() {
      console.log(this.fullName);
    },
  },
});
```
