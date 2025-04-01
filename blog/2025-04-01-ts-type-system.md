# 타입스크립트 형식시스템 (type system)

## 빠진 프로퍼티와 undefined 값 구별하기

- 선택형 프로퍼티를 더 엄격하게 처리하도록 tsconfig에서 `exactOptionalPropertyTypes` 활성화하기
  (Interpret optional property types as written, rather than adding undefined.)

```
type Settings = {
  language: "en" | "kr",
  theme?: "github"
}

function getTheme(settings : Settings) {
  if ('theme' in settings) {
    return settings.theme
  }
  return 'default'
}

// 빠진 프로퍼티
const settings: Settings = {
  language: 'en'
}

// undefined 값
const settings1: Settings = {
  language: 'en',
  theme: undefined
}

console.log(getTheme(settings)) // 'default'
console.log(getTheme(settings1)) // undefined
```

## 열거형 사용하기

Q. 타입스크립트 enum(열거형)은 다른 형식 시스템과 다르게 동작하는 거 같다.

A. `enum` 보다는 `const enum`을 사용한다. `enum`의 문제가 무엇인지 이해하고 유니온 형식 같은 대안을 활용한다.

다음 타입스크립트 코드는 js 코드를 만들어낸다.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

```js
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
  Direction[(Direction["Left"] = 2)] = "Left";
  Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));
```

---

`const enum`를 이용하면 코드 생성을 안함

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

```js
"use strict";
```

ts 5.0 이후부터는 열거형 해석이 엄격해졌다. 그 이전에는 의도대로 동작안할 여지가 있다.

## 구조적 형식 시스템에 명목상 형식 정의하기

Q. 애플리케이션에 같은 기본 형식을 가리키는 별칭이지만 의미가 완전히 다른 여러 형식이 있다. 구조적 형식 시스템에서는 이들을 동일하게 취급하지만 그러면 안된다.

A. (브랜딩) 타입마다 구분할 수 있는 속성을 정의한다.

다음 코드는 동작한다.

자바스크립트는 주로 객체 리터럴에 의존하며 타입스크립트는 형식이나 이들 리터리의 모양을 추론하려 노력

```ts
type Person = { name: string };
type Student = { name: string };

function isPersion(person: Person) {
  console.log(person);
}

const student: Student = {
  name: "a",
};

isPersion(student);
```

kind 속성을 추가

```ts
type Person = {
  name: string;
  _kind: "person";
};
type Student = {
  name: string;
  _kind: "student";
};

function isPersion(person: Person) {
  console.log(person);
}

const student: Student = {
  name: "a",
  _kind: "student",
};

// isPersion(student)
// Argument of type 'Student' is not assignable to parameter of type 'Person'.
//   Types of property '_kind' are incompatible.
//     Type '"student"' is not assignable to type '"person"'.(2345)
```

```ts
type Credits = number & { _kind: "credits" };
type AccountNumber = number & { _kind: "accountNumber" };

const account = 12345678 as AccountNumber;
let balance = 1000 as Credits;
const amount = 1000 as Credits;

function increase(balance: Credits, amount: Credits) {
  // 결과가 number라 Credits 타입으로 `형식 어서션` 해줌
  return (balance + amount) as Credits;
}

balance = increase(balance, amount);
// balance = increase(balance, account)
// Argument of type 'AccountNumber' is not assignable to parameter of type 'Credits'.
//   Type 'AccountNumber' is not assignable to type '{ _kind: "credits"; }'.
//     Types of property '_kind' are incompatible.
//       Type '"accountNumber"' is not assignable to type '"credits"'.(2345)
```

## 문자열 하위 집합의 느슨한 자동 완성 활성화하기

Q. API는 모든 문자열을 전달할 수 있어야 하는데, 그중에서도 몇 가지 문자열값을 자동 완성으로 보여주려 한다.
A. 문자열 리터럴 유니온 형식에 string & {}를 추가

### 유즈케이스

- 리엑트용 Definitely Typed 형식 정의 (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L2603-L2673)
- CSSType (https://github.com/frenic/csstype/blob/master/index.d.ts#L19039-L19049)

```ts
// 자동완성됨
type ContentType = "post" | "page" | "asset" | (string & {});
// 자동완성 안됨
// type ContentType = "post" | "page" | "asset" | string;

function retrieve(content: ContentType) {}
retrieve("");
```

## 선택형 never로 배타적 논리합 모델 만들기

Q. 유니온에서 서로 겹치지 않도록 모델을 만들어야하는데, 이를 구별할 kind 프로퍼티를 api에서 사용할 수 없는 상황
A. 선택형 never 기법으로 특정 프로퍼티를 제외 (구별해야하는 프로퍼티가 적을때 활용 가능)

```ts
type SelectBase = {
  options: string[];
};

type SingleSelect = SelectBase & {
  value: string;
};

type MultipleSelect = SelectBase & {
  values: string[];
};

type SelectProperties = SingleSelect | MultipleSelect;

function select(param: SelectProperties) {
  if ("value" in param) {
    // 단건일때
  } else if ("value" in param) {
    // 여러 건일때
  }
}

select({
  options: ["a"],
  value: "1",
});
select({
  options: ["a"],
  values: ["1"],
});

// 이거는 무슨 동작???
select({
  options: ["a"],
  values: ["1"],
  value: "1",
});
```

선택적 never를 적용

```ts
type SelectBase = {
  options: string[];
};

type SingleSelect = SelectBase & {
  value: string;
  values?: never;
};

type MultipleSelect = SelectBase & {
  values: string[];
  value?: never;
};
```

## assertNever 함수를 이용해 완전 검사하기

Q. 시간이 지나면서 유니온 형식에 새 구성요소를 추가하는 상황이 발생. 관련된 부분의 모든 코드에서 고쳐야함
A. assertNever 함수로 모든 남은 케이스에 어서션을 적용해 모든 상황을 확인하도록 완전 검사를 수행

```ts
type Circle = {
  radius: number;
  kind: "circle";
};

type Square = {
  x: number;
  kind: "square";
};

// 신규 타입이 나오고
type Rectangle = {
  x: number;
  y: number;
  kind: "rectangle";
};

// type Shape = Circle | Square;
// 유니온 타입이 새로 확장된다면
type Shape = Circle | Square | Rectangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI;
    case "square":
      return shape.x * shape.x;
    default:
      // 이 케이스에서 shape는 never가 아닌 shape 타입이기에
      // ts에서 에러를 얄려줌
      throw assertNever(shape);
  }
}

function assertNever(value: never) {
  console.error(value);
  throw Error("not posible");
}
```
