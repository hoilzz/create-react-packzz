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
