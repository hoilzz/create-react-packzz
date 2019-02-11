# Code Split

코드 스플릿은 Webpack의 가장 강력한 기능 중 하나다.

- 코드를 다양한 번들로 나눈다
- 이 번들은 필요할 때 로드되거나 병렬로 로드될 수 있다 

- 작은 번들을 만들 때 사용된다
- 리소스 부하 우선순위 제어할 수 있다

Code Split을 잘 사용하면 load time에서 이득을 얻을 수 있다.

웹팩에서 보통 다음 세 가지 방법을 통해 코드 스플릿을 한다.

- Entry Points : `entry` 를 이용한 스플릿 
- 중복 방지 : 중복 제거와 chunk별로 스플릿하기 위해 `SplitChunksPlugin`을 이용하기
- Dynamic Import : 모듈 내에서 inline function 호출을 통해 코드 분할하기(inline 함수 내에서 import문을 이용하여 모듈 로드)

## 1. Entry Point
너무 쉬워서 넘어가겠다. [링크](https://webpack.js.org/guides/code-splitting/#entry-points) 참조

## 2. 중복 방지 

__기존 entry나 새로운 chunk의 공통 의존성을 추출한다.__

일부러 중복을 발생시키기 위해

- src/another.js 를 생성하여 lodash를 import 하고, 
- src/index.js에서도 동일하게 lodash를 import 해보자.

빌드를 해보면 2개의 번들에서 lodash를 각각 가지고 있는 모습을 볼 수 있다. 이러한 중복을 줄이기 위해 다음 설정을 추가하자.

```js
// webpack.common.js

module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

위 설정 적용 후, npm run build를 다시 실행하면 빌드 결과물이 1개 추가된다. 
dist/app과 another 번들 파일을 확인해보면 lodash가 빠져있고,dist/venders~를 확인해보면 lodash가 포함된것을 알 수 있다. 즉, 공통 의존성은 따로 split하여 중복 제거하는 것을 알 수 있다.

---

## Dynamic imports

Dynamic code splitting에 대해서 webpack은 2가지 테크닉을 지원한다.
권장되는 방법은 dynamic import를 위해 ES proposal에 허용된 `import()` 사용하는 것이다.

> import()는 promise를 내부적으로 사용. import() 문 사용할꺼면 older browser에서 Promise polyfill을 이용해야한다는 거 잊지 말자.

```js
module.exports = {
  // ...
  output: {
    // ...
    chunkFilename: '[name].bundle.js'
  }
}
```

chunkFilename은 아래 webpackChunkName의 주석에 작성된 이름을 가져다 사용한다. 

```js
// index.js
function dynamicLoad() {
  return import(/* webpackChunkName: "asyncHoilzz" */ './async').then(
    ({ default: asyncFunc }) => {
      asyncFunc();
    }
  )
}

dynamicLoad();

// async.js
export default () => {
  console.log('this is async!');
}
```

위와 같이 파일 생성 및 코드 추가하여 npm run build하면 dynamic import가 되는 파일이 따로 빌드되는 것을 확인할 수 있다.

이 코드는 지우자. react 적용할 때 다시 알아보자.

## Bundle 분석하기
(귀찮으면 스킵하거나 [복붙](https://github.com/hoilzz/create-react-boilerplate-hoil/commit/446cf8593ee4b8c1a5532b1e0a8a6636748d65cc)하자.)
code split하기 시작하면, output을 분석하는 것은 유용하다.

가장 인기가 많은 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)를 설치하여 이용해보자. 

얘로 할 수 있는 건
- bundle 내부에 __진짜로__ 뭐가 있는지 나타낸다
- 크기를 많이 차지하는 모듈을 확인할 수 있다.
- 실수로 번들에 추가된 모듈을 찾을 수도 있다.
- 제일 좋은건 minified bundle을 지원하고, 번들링된 모듈의 real size, gzipped size를 알 수 있다!




## SplitChunksPlugin

SplitChunksPlugin에 대해 자세히 알아보자. 자세히 알아보기 싫으면 아래 코드만 적용하자.

원래 청크는 웹팩 내부 그래프에서 parent-child 관계로 연결되어있다. 

중복 피하기, 최적화를 하는데
다음 조건에 기반하여 chunk를 쪼갠다.

- 새로운 청크는 
  - 공유되거나
  - `node_modules` folder에 있는 모듈(ex. react)일 수 있다. (모듈은~ 이 문장이 뭔소린지 잘 모르겠다.)
- 새로운 청크는 30Kb보다 크다.
- on demand 청크를 로드할 때 병렬 요청의 최대 개수는 5개 이하다.
- 첫 페이지 병렬 요청의 최대 개수는 3개 이하다.

마지막 2가지 조건을 충족 할 때, 더 큰 청크가 권장된다. 즉 여러개 작은 청크보다는 1개 청크가 더 낫다는 얘기같다.

청크를 어떤식으로 활용하는지 알고 싶다면 다음 [공홈 링크](https://webpack.js.org/plugins/split-chunks-plugin/#examples)를 참고하자.

이 중 2번째 예제를 참고하여 만들겠다.

`node_modules`의 모든 코드를 포함하는 `vendors` chunk를 만들자.

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

splitChunks.cacheGroups
- cachegroups은 특정 조건으로 chunk를 생성하라고 webpack에게 말하는거.
  - node_modules를 포함하고
  - 이름은 vendors
  - chunks는 3가지 값을 가짐
    - initial : 초기 로드 되는 것만 청크에 추가
    - async : 동적 로드 되는 것만 청크에 추가
    - all : 3개 중 가장 강력함. initial + async인데, 청크는 async와 non-async 청크 간에 공유될 수 있음 

위 설정은 모든 외부 패키지를 포함하는 큰 청크를 만들거다. core framework, utilities만 vendors로 포함시키고 나머지 종속성은 동적 로드하는 것을 권장한다.

