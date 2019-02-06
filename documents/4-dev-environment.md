# 4. 개발 환경 갖추기

얘는 production mode에서는 필요없는 설정이다. development mode에서만 필요하다.

일단 mode를 development로 설정하자.

> [mode](https://webpack.js.org/concepts/mode/#mode-development)
> 각 모드에 따라 최적화가 달라진다.
> dev는 개발의 생산성을 높이기 위한 설정. production은 생산성은 고려하지 않고 실제 서비스 될 때 필요한 최적화 설정이 포함됨.

```js
// webpack.config.js
module.exports = {
  mode: 'development',
  //...
}
```

## source map 이용하기.

코드가 번들링 됐을 때, 어떤 코드 라인에서 에러 발생했는지 추적하기 어렵다. 

그래서 JS에서 [source map](https://blog.teamtreehouse.com/introduction-source-maps)을 제공한다. 이것은 컴파일된 코드가 원래 소스코드에 매핑된다. 또한, [다양한 옵션](https://webpack.js.org/configuration/devtool/)을 가진다.

[웹팩에서 권장하는 개발 환경에 적합한 옵션](https://webpack.js.org/configuration/devtool/#development)에서 `cheap-module-eval-source-map`을 사용할거다. 

요거에 대한 장점과 테스트는 webpack-dev-server까지 설치하여 실습하며 알아보자.

## webpack-dev-server 이용하기

```
npm i -D webpack-dev-server
```

webpack-dev-server는 간단한 web server를 제공하고 live reloading 기능을 제공한다.

```js
// webpack.config.js
module.exports = {
  devServer: {
    contentBase: './dist'
  }
}
```

contentBase는 웹팩 output.path와 동일해야한다. 

> WDS(webpack-dev-server)는 compile 후에 output 파일을 작성하지 않는다. 대신에, web server 메모리에 bundle 파일을 저장하고 그것을 제공한다. 만약 페이지가 bundle file을 다른 path에서 찾아야한다면, `publicPath` 옵션을 이용하여 경로를 설정해줘야한다.

npm 명령어에 데브서버 추가해보자.

```
"scripts": {
  "start": "webpack-dev-server"
}
```

이제 일부러 error를 내보자. (아무거나 해보자.)

콘솔 창을 보면 오류난 코드의 라인을으로 매핑되는 것을 확인할 수 있다.

cheap-module-eval-source-map의 기능을 볼 수 있는데,
- cheap이 붙는 이유는 column mapping은 되지 않기 때문이다
- 대신, line number로 매핑된다.
- eval이 붙은 이유는 각 모듈은 `eval()`로 실행되기 때문이다.

## hot moudle replacement

현재 webpack-dev-server는 코드 수정 후 저장하게 되면 전체 페이지를 reload 한다.

HMR은 웹팩에서 제공하는 가장 유용한 것 중 하나임. 전체 페이지 새로고침 없이 runtime 중에 업데이트되는 모듈이다. (요번 모듈은 production에서 사용하지 않을거임)

webpack-dev-server와 webpack 내장 기능인 HMR plugin을 이용할거다.

```js
const webpack = require('webpack');l

module.exports = {
  //...
  devServer: {
    //...
    hot: true
  },
  plugins: [
    //...
    new webpack.HotModuleReplacementPlugin()
  ]
}
// index.js

//...
if (module.hot) {
  module.hot.accept("./math.js", function() {
    result = subtract(5, 7);
    console.log(result);
  });
}
```

위에 있던 subtract 함수를 module.hot.accept의 2번째 함수로 옮기자.

그리고 subtract 함수의 연산식을 *,/ 로 바꿔가며 hot module이 제대로 동작하는지 확인하자. hot module 적용하기 전에는 페이지가 새로고침 됐었는데, 이제 새로고침 하지 않고 변경된 코드를 적용한다.

요고는 react-hot-loader를 통해 더 자세히 동작을 알아보자.

## Summary

- mode는 development와 production이 있는데 각 상황에 맞게 최적화됨.
- 코드 번들링 되고 나서 error 발생하는 code를 찾기 힘든데 sourcemap 을 이용하면 됨
- webpack-dev-server와 Hot module replacement를 통해 개발 생산성 높일 수 있음.




