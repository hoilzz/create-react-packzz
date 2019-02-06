# 2. add babel

babel은 JS Compiler다.

바벨은 ES6+ code를 ES5로 변경해준다. 그래서 하위 브라우저(IE..)에 대응할 수 있다.

바벨 [getting started](https://babeljs.io/docs/en/usage) 제안하는 package를 먼저 설치하자.

```
npm install -D @babel/core @babel/preset-env babel-loader
npm install @babel/polyfill
```

- core : transpile시 이용되는 코어 모듈
- preset-env : 최신 JS를 이용할 수 있도록 해주는 smart preset. 얘 이용하면 어떤 syntax가 타겟 환경에 맞춰서 transpile되어야 하는지 micromanage가 필요하지 않음. 그냥 얘 사용하면 편안-하고 bundle도 더 작아짐. (자세히 알고싶으면 [링크](https://babeljs.io/docs/en/babel-preset-env))
  - babel 설정할 때 또 추가 설명할거임

- polyfill : ES6+ 환경을 제공한다. 그리고 library/tool 보다는 실제 서비스코드에서 사용된다.
  - new built-in인 Promise, WeakMap 등을 사용할 수 있도록, polyfill은 global scope 혹은 native Prototypes에 추가할 것이다.

그래서 transpile에 사용되는 패키지들은 devDependency로, 서비스 코드에 포함되어야 하는 polyfill은 dependency로 설치한다.

## webpack에 babel 설정 추가하기.

```
npm i -D babel-loader
```

loader를 자세히 알고싶다면.. [링크](https://github.com/hoilzz/TIL/blob/master/FrontEnd/webpack/%EA%B3%B5%ED%99%88%EB%B2%88%EC%97%AD/loader.md)

loader는 걍 전처리기임.

일단,

build 결과물을 편하게 보기 위해 math파일을 추가하자.
그리고 이 파일을 index.js에서 import 하자.

```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// index.js
import { add, subtract } from "./math";

let result = add(5, 3);
console.log("5 + 3 : ", result);
result = subtract(5, 3);
console.log("5 = 3 : ", result);
```

```js
// webpack.config.js에 module 추가.
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }
  ]
}
```

> module 옵션
> 번들링 처리할 떄, 웹팩 자체만으로 처리할 수 없는 확장자나 JS지만 ESNext로 작성된 모듈들을 module 옵션으로 처리할 수 있다. 이 떄 module 옵션은 loader를 사용한다.

- test : regex를 통해 load할 파일 지정.
- exclude : 바벨 로더는 느림. 가능한 적은 양의 파일만 transforming 해야함. transforming할 필요가 없는 node_modules를 제외.
- use : 사용할 모듈 및 모듈에 대한 옵션 작성.
  - 요 설정이 너무 길어질거 같으면 babel.config.js 파일을 따로 생성하여 관리.

> babel-loader가 느리기 때문에 더 빠르게 하려면
> cacheDirectory 옵션을 이용하자. 
> - 얘는 filesystem에 transformation(loader의 결과물)을 캐싱하여 2x정도 더 빠르게 할 수 있다.

```js
// 프로젝트 루트 폴더에 babel.config.js 생성
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
        targets: "> 0.25%, not dead"
      }
    ]
  ],
  // plugins: []
};
```
babel은 크게 preset과 plugin으로 나뉜다.
preset은 바벨 플러그인의 배열처럼 행동하는데, 플러그인들을 모아놓은 거라고 생각하면 된다. 

> preset은 @babel/preset-stage-X X는 0~4까지 있음. stage들이 각각의 플러그인 모음집.
> plugin은 바벨이 컴파일시 transformation에 이용된다.
> 예를 들어 @babel/plugin-transform-arrow-functions 얘는  ES6 화살표 함수에 대해 위 플러그인을 이용하여 transformation을 진행.

요약하면 어떤 plugin쓸지 모를 때 plugin 모음집 preset 사용하면됨. 그러다가 preset이 transformation 하지 못하는 특정 ES6+ syntax를 사용할 경우, 그 특정 플러그인만 추가해주면됨.

여튼 우리는 rough한 설정을 할꺼니까 preset만 설정해주면된다.
@babel/preset-env 설정에 대해 알아보자.
- targets : [browserlist](https://github.com/browserslist/browserslist)와 같이 target browser 설정할 수 있음. 
  - 걍 바벨 공홈에서 써진걸로 설정. 
- modules : ES6 모듈 문법을 다른 모듈타입으로 변경하는건데, false로 한 이유는 import/export 문을 그대로 사용하기 위함.
  - 왜냐하면 webpack의 treeshaking은 import/export로 이뤄져야하기 때문(자세한건 [이 글](https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365) 읽으면 될듯)
- useBuiltIns
  - 바벨7이 되기 전에 babel/polyfill을 웹팩 엔트리에 별개로 추가하여 import 했었음.
  - 근데 이렇게 하면 사용하지 않는(불필요한) polyfill도 import하는 문제 발생.
  - 그래서 usage라는 설정이 추가됨.
  - 말 그대로 각 파일에서 사용되는 polyfill만 import함.
    - 근데 해당 브라우저에서 지원하는 syntax일 경우 import 하지 않음. 즉, 조건 하나를 더 추가(브라우저에서 지원하지 않을 경우) 하여 import
  - 예제를 보고 싶거나 자세히 알고 싶으면 [링크](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) 이동