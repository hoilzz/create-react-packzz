# react

```
npm i react react-dom react-prop-types
```

## 바벨 설정 

jsx syntax, react 관련 syntax를 transform 할 preset을 추가하자.

> babel-loader의 include 설정이 잘못되어서 transpile이 전혀 되지 않고 있었다... 다음과 같이 수정하자
```js
// babel.config.js -> .babelrc.js

// webpack.common.js
module.exports = {
  //...
      include: path.join(rootPath, "src"),
      use: {
        loader: 'babel-loader',
        //...
      },
      //...
}
```

## webpack-dev-server

root를 id로 가지는 div를 index.html에 포함시켜야 하기 때문에 public/index.html을 생성하여 div를 추가하자.

```js
{
  open:true,
  history
}

```

## react-hot-loader

```
npm i react-hot-loader
```

react-hot-loader는 dev 환경에서만 사용하는 패키지다. 서비스 코드에 나갈 얘가 아니면 devDependency인데, getting started에서 왜 dependency에 설치하라고 작성했는지 궁금했다.

걍 이유는 [다음](https://github.com/gaearon/react-hot-loader/issues/675)과 같다. 답변에 [README](https://github.com/gaearon/react-hot-loader/issues/675)에도 명시 하겠다고 해서 확인했더니 있다.

> Note: react-hot-loader는 dev dependency 대신에 dependency로 안전하게 설치할 수 있다. 왜냐하면 react-hot-loader가 자동으로 production에서는 실행하지 않도록 되어있기 때문이다.

```js
import React from "react";
import { hot } from 'react-hot-loader/root'

const App = () => <div>hoilzzzz</div>;

export default hot(App);
```

hot 관련 메서드를 추가하여, npm start로 데브서버 띄운 후에 코드를 조금씩 바꿔가며 hot load가 되는지 확인하자.(새로고침 되지않고 브라우저 콘솔에서 hot-update 내용이 나오는지 확인하면 된다.)

## code-split

리액트 이용시에도 코드 스플릿이 제대로 동작하는지 알아보자. 이왕하면 간단한 리액트 애플리케이션을 만들면서 알아보자.
