const argv = require("yargs").argv;
const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, "../dist");
const rootPath = path.resolve(__dirname, "../");
const publicPath = path.resolve(__dirname, "../public");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename:
      argv.env === "prod" ? "[name].[contenthash].js" : "[name].bundle.js",
    path: distPath
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {
      root: rootPath
    }),
    new HtmlWebpackPlugin({
      title: "Production",
      template: path.join(publicPath, "index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(rootPath, "src"),
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  }
};