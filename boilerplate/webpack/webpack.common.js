const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distPath = path.resolve(__dirname, '../dist');
const rootPath = path.resolve(__dirname, '../');
const publicPath = path.resolve(__dirname, '../public');

const isProdMode = process.env.NODE_ENV === 'production';
const webpackMerge = require('webpack-merge');
const resolve = require('./resolve');

module.exports = webpackMerge(resolve, {
  entry: {
    app: ['./src/config/index', './src/index.js'],
  },
  output: {
    filename: isProdMode
      ? 'js/[name].[contenthash].js'
      : 'js/[name].bundle.js',
    path: distPath,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {
      root: rootPath,
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.join(publicPath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isProdMode
        ? 'css/[name].[hash].css'
        : 'css/[name].css',
      chunkFilename: isProdMode
        ? 'css/[id].[hash].css'
        : 'css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        include: path.join(rootPath, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProdMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
