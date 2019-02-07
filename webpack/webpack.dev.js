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