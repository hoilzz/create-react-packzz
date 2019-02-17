const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    open: true,
    historyApiFallback: true,
    publicPath: '/',
    overlay: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
