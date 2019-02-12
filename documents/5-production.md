# Production

`development`와 `production`의 빌드 목표는 아예 다르다.

`development`
- strong source map
- localhost server with live reloading or Hot module replacement

`production`
- minified bundles
- lighter weight source maps
- load 시간을 개선하기 위한 optimized assets

webpack 공홈에서는 __분리된 웹팩 설정__ 작성하기를 권장한다.

분리하긴 할건데 DRY하게 유지하기 위해 공통 설정을 따로 만들거다. 그래서 각 환경에 맞게 merge 할거다. 이것은 [`webpack-merge`](https://github.com/survivejs/webpack-merge)를 이용할거다.

```
npm i -D webpack-merge
```

webpack 폴더를 만들어서 webpack.common.js, webpack.dev.js, webpack.prod.js 파일 3개 만들자.

```js
// webpack/webpack.common.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
};

// webpack/webpack.dev.js
const webpack = require('webpack');

module.exports = {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  devtool: "cheap-module-eval-source-map",
}

// webpack/webpack.prod.js
module.exports = {
  mode: "production",
  devtool: 'source-map' // 새로 추가된 source map 설정인데 아래에서 다시 설명.
};
```

- common.js
  - entry, output, babel-loader는 dev와 prod 둘 다 필요하기 때문에 포함
  - 플러그인은 HMR은 dev에서만 필요하므로 얘를 제외하고 모두 공통 사용
- dev.js
  - HMR, devServer, devtool
- prod.js
  - mode: production

요 3가지를 최상단의 webpack.config.js에서 webpack-merge로 합쳐서 config 설정.

```js
// package.json
"scripts": {
  "build": "webpack --env=prod",
  "start": "webpack-dev-server --env=dev"
},
// webpack.config.js
const commonConfig = require("./webpack/webpack.common.js");

const webpackMerge = require("webpack-merge");
const argv = require("yargs").argv;

module.exports = () => {
  const envConfig = require(`./webpack/webpack.${argv.env}.js`);

  return webpackMerge(commonConfig, envConfig);
};
```

scripts 명령어에서 `--`를 통해 argument를 전달할 수 있다.
이 argument를 편하게 object로 사용하기 위해 [yargs](https://github.com/yargs/yargs)를 사용할거다.

그리고 webpack.config.js에서 
argv.env에 따라 다른 webpack설정을 불러와서 최종 config를 생성할 것이다.

## Specify the Mode

많은 라이브러리가 라이브러리 내부에 포함되어야만 하는 것을 결정하기 위해 `process.env.NODE_ENV` 변수를 이용한다. 예를 들어, `production` 모드가 아닌 경우에 몇몇 라이브러리는 debuggin을 더 쉽게 하기 위해 testing과 logging을 추가할 것이다.

`process.env.NODE_ENV === 'production'` 은 실제 유저를 위해 실행되는 방식을 최적화 하기 위해 중요한 코드를 추가하거나 drop할 것이다. webpack v4부터는 `mode`가 자동으로 `DefinePlugin`(NODE_ENV 같은 환경 변수 설정)을 설정할 것이다.

여튼 mode: production 하면 자동으로 NODE_ENV가 production 설정되서 최적화된다는 뜻임.

## Source Mapping

production에서 디버깅, bench mark test(?)에 유용한 source map을 권장한다. `devtool: source-map` 을 권장한다. 빌드 속도가 꽤 빠르면서 production 모드에서 쓰기 적합하다.

> `inline-***` 과 `eval-***`은 production에서 쓰지말자. 번들 사이즈가 늘어나고 전체 퍼포먼스가 저하된다.