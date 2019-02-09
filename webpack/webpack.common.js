const argv = require("yargs").argv;
const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, "../dist");
const rootPath = path.resolve(__dirname, "../");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename:
      argv.env === "prod"
        ? "[name].[contenthash].js"
        : "[name].bundle.js",
    path: distPath
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
      title: "Production"
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
  }
};
