# eslint, prettier

eslint, prettier를 사용하면 생산성이 높아집니다. velopert님이 너무너무 잘 [정리](https://velog.io/@velopert/eslint-and-prettier-in-react)해주셔서 요기 참고 부탁드립니다.

대신 위에 없는 내용만 다뤄보겠습니다.

위 방식대로 하면 dynamic import에서 eslint가 다음과 같은 에러를 발생시킵니다.

```
Parsing error: Unexpected token import
```

[Eslint README의 What about experimental features?](https://github.com/eslint/eslint#what-about-experimental-features)를 보면 이유를 알 수 있습니다.

요약하자면 EsLint's parser는 공식적으로 최신 ES 표준만 지원합니다. experimental 이거나 비표준(ts) 은 지원하지 않습니다. experimental, non-standard에 대해서는 babel-eslint parser와 eslint-plugin-babel을 사용하세요. ES 표준 으로 (TC39 process에 따라 stage 4) 채택되면, 그 때 core rule에 추가할거에요. 여튼 이외에 것들은 다른 parser를 이용하세요

## babel-eslint

babel-eslint를 이용하면 eslint가 이해할 수 있도록 babel parser가 먼저 파싱을 진행한다.

```
npm i -D eslint babel-eslint
```

```js
// .eslintrc.js
module.exports = {
  //...
  parser: "babel-eslint"
};
```

## eslint-loader

컴파일시에 **가장먼저** eslint를 통해 lint 검사를 거치도록 해보자.

```js
// webpack.common.js
{
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader'
}
```

`enforce: 'pre'`는 말 그대로 다른 loader보다 미리 수행하도록 강제하는 옵션이다. 바벨로 트랜스파일 하기 전에 lint 검사를 해야하기 때문이다.

이케하면 끝난다~
