const analyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new analyzerPlugin({
      analyzerMode: "server"
    })
  ]
};
