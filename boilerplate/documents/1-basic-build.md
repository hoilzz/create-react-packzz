# 웹팩으로 빌드해보기

```
mkdir webpack-tutorial
npm init -y
cd webpack-tutorial
npm i -D webpack webpack-cli
```

웹팩은 JS 모듈 컴파일할 때 사용된다.

빌드해보자.
하기 전에, local에 설치된 webpack cli를 이용하기 위해 package.json에 명령어를 추가하자

```js
// pacakge.json
"scripts": {
  "build": "webpack"
}
```

```
$ ./node_modules/.bin/webpack-cli
Hash: 249877c4f4f2960996da
Version: webpack 4.29.0
Time: 283ms
Built at: 2019-02-02 20:18:39
  Asset       Size  Chunks             Chunk Names
main.js  986 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 131 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

이케 나오면 빌드 성공이다. (dist/main.js 에서 빌드 결과 확인 가능하다.)

## Modules

import 와 export 문법은 ES6 표준이고, 대부분 브라우저에서 지원한다. 오래된 브라우저에서는 지원하지 않는다. 하지만 웹팩은 지원한다.

webpack은 실제로 코드를 **transpile** 한다. 그래서 오래된 browsers가 그것을 실행한다. (구경하고 싶으면 빌드 결과물을 보면된다.)

하지만, 중요한 건 웹팩은 `import`와 `export`문은 변경하지 않는다. 만약 ES6 feature 를 사용한다면, webpack loader system을 통해 **babel** 같은 transpiler를 사용해야한다.

## Using Configuration

webpack.config.js 만들자.

> webpack은 webpack.config.js를 default로 찾는다.

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

- entry :
- output :
- mode: development와 production이 있는데 minimize 되지 않는 결과물을 보기 위해 development로 세팅

```js
import _ from "lodash";

function component() {
  let element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
```

다음장에서 바벨 추가해보자.