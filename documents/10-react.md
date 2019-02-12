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

```
npm i react-router-dom
```

추가된 [어플리케이션 코드](https://github.com/hoilzz/create-react-boilerplate-hoil/commit/f5509353d0c4b0cad0a3f00d0931c3ab4437c743)

위 페이지에서 asyncPage는 해당 페이지에 들어가기 전까지 로드할 필요가 없는 코드다. 이러한 코드들을 분리하여 필요할 때만 로드하도록 즉, 이 페이지에 진입했을 때만 불러올 수 있도록 할 수 있다. 

React의 lazy, suspense를 이용하여 code split을 해보자.

추가된 [코드](https://github.com/hoilzz/create-react-boilerplate-hoil/commit/0d04a7746e6c12e0283ad1391e361941fa67a156)

다음과 같은 오류가 발생한다.

```
Support for the experimental syntax 'dynamicImport' isn't currently enabled 
...
Add @babel/plugin-syntax-dynamic-import (https://git.io/vb4Sv) to the 'plugins' section of your Babel config to enable parsing.
```

친절하게 뭘 추가하른지 알려줬다. 추가해주자.

```
npm i -D @babel/plugin-syntax-dynamic-import
```

router에서 다음과 같은 에러를 본다면 다음 [링크](https://github.com/ReactTraining/react-router/issues/6471)를 참조하자. 4.4-beta에서 해결했다고한다. 

npm start하여 빌드 결과물을 보자.

```
            Asset       Size   Chunks             Chunk Names
      0.bundle.js   3.49 KiB        0  [emitted]
      1.bundle.js   2.79 KiB        1  [emitted]
    app.bundle.js     48 KiB      app  [emitted]  app
       index.html  420 bytes           [emitted]
vendors.bundle.js   3.74 MiB  vendors  [emitted]  vendors
```

0, 1번 번들로 나뉜것을 알 수 있는데 filename을 작성해주고 싶으면 [요기](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 참고하자.

그리고 실제로 async page 진입시에 split된 chunk를 요청하는지 알아보자.

개발자도구의 network 탭을 열어놓고 async 페이지 진입하여 0.bundle.js 나 [chunkname].bundle.js 를 요청하는 것을 확인할 수 있다.

