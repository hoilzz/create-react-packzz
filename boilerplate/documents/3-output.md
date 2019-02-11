# 3. output

만약에 서비스하는 앱이라면, 점점 커질 수 있다. [file 이름에 hash를 이용하여](https://webpack.js.org/guides/caching/) static resource에 대해 캐싱할 수 있다.

일단, output 이름부터 지정해주자. (사실 안해줘도 되는데 나중에 entry가 여러개가 될 경우를 대비해서 미리 세팅해주자.)

```js
entry: {
  app: "./src/index.js",
},
output: {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist")
},
```

특정 entry의 key를 app으로 변경하고, output의 `[name]`을 통해 빌드 결과물의 이름을 설정할 수 있다.

npm run build로 빌드된 파일명이 app.bundle.js로 변경됐는지 확인하자.



## html-webpack-plugin

앞에서 entry 포인트의 key값을 output의 filename으로 갖도록 변경해보았다. 근데 entry point 이름이 바뀔 때마다 index.html에서 참조하고 있는 js 파일이름을 바꿔줘야한다.

htmlwebpackplugin을 통해 이 문제를 해결하자.

```
npm i -D html-webpack-plugin
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development'
    })
  ]
}
```

htmlwebpackplugin은
- index.html을 자동 생성
- bundles 요청하는 script문을 변경된 파일이름으로 자동으로 추가

npm run build하고, dist 폴더 내의 index.html을 열어보자.
script문이 자동으로 추가된 것을 확인할 수 있다.


## /dist folder의 파일들 자동 삭제하기 

현재 dist폴더 내부에 main.js, app.bundle.js 등이 혼재되어있다. 나중에 빌드 결과물에 대해 캐싱 기법을 적용하기 위해 파일명에 hash값을 사용할텐데, dist 폴더 안에 파일이 계속 추가될것이다.

그래서 매번 빌드할 때마다 자동으로 dist 폴더를 삭제하는 플러그인 이용 할거다.

```
npm i -D clean-webpack-plugin
```

```js
// webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    //...
  ]
}
```