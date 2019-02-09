# 5. Caching

브라우저가 static 자원을 요청할 때, 불필요한 traffic을 줄이기 위해 캐싱 기법을 이용한다. 근데 이 캐싱 기법 이용시에 새로운 코드가 배포됐을 시에는 서버의 응답값으로 캐싱된 자원을 주면 안된다. 기존에는(그냥 내가 알기에 기존에는..) 자원 요청 url에 쿼리스트링에 timestamp를 이용하여 캐시기법을 이용했다. 근데 이 기법은 코드 변경 유무와 관계없이 빌드될 때마다 timestamp가 변경되었다. 이것의 문제점은 코드가 변경되지 않았어도 timestamp가 변경되어 불필요한 트래픽을 유발한다.

이것을 웹팩은 contents가 바뀌지 않은 경우에는 cached 된채로 남겨두는 컴파일 방법을 통하여 쉽게 해결할 수 있다.

## output filename

`output.filename` [대체](https://webpack.js.org/configuration/output/#output-filename) 기법을 이용하여 output file 이름을 정의할 수 있다. 

이 중 `[contenthash]` 대체 기법을 이용하여 unique hash를 filename에 추가할 것이다.

> [contenthash]
> asset content가 변경될 때만 [contenthash]가 변경됨.

webpack의 output.filename을 다음과 같이 변경하자.

```js
output: {
  filename: "[name].[contenthash].js",
}
```

npm run build 해보자. 2번 반복해서 hash값이 그대로인지 확인하고, 코드 한 줄 변경 후 hash값이 변경됐는지 확인하자.

이와 같이 실제 코드가 변경됐을 때만 hash값이 변경된다.

근데 위와 같이 적용하여 build 명령어는 잘 되지만, webpack devser를 실행시 에러가 발생한다.

```
ERROR in chunk main [entry]
[name].[chunkhash].js
Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' 
(use [hash] instead)
```

[관련 내용](https://stackoverflow.com/questions/50217480/cannot-use-chunkhash-or-contenthash-for-chunk-in-name-chunkhash-js-us) 을 찾아보니 HMR plugin때문에 발생하는 거 같다.

해결책은 HMR을 사용하지 않거나, contenthash를 사용하지 않는것이다. 

HMR을 사용하지 않을 수 없으니 production 일때 contenthash 사용, dev일 때는 hash를 사용한다.

또 한 가지 문제가 있는데, 코드 수정시 관련 chunk에 대해서만 hot-update를 하기 위해 HMR을 이용한다. 하지만 output의 filename에 hash를 사용하기 때문에, 모든 compile마다 hash가 새로 생성되어 모든 파일명이 바뀌면서 전부 재빌드를 하게되는.. 약간 비효율적으로 보인다. dev 개발시에는 filename을 고정값으로 하여 하면 기존 HMR 방식대로 개발환경을 갖출 수 있다.

```js
// webpack.config.js

module.exports = {
  //...
  output: {
    filename:
      argv.env === "prod"
        ? "[name].[contenthash].js"
        : "[name].bundle.js",
  }
}
```

요기까지 해서 js 개발시 최소로 필요한 세팅을 완료하였다. 다음은 포스팅은 react 개발 가능하도록 세팅을 하고 마무리하도록 하겠다.
