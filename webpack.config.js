const commonConfig = require("./webpack/webpack.common.js");

const webpackMerge = require("webpack-merge");
const argv = require("yargs").argv;

const addons = (addonsArg) => {
  let addons = [...[addonsArg]].filter(Boolean);

  return addons.map(addonName => require(`./webpack/addons/webpack.${addonName}.js`))
}

module.exports = () => {
  const envConfig = require(`./webpack/webpack.${argv.env}.js`);

  return webpackMerge(commonConfig, envConfig, ...addons(argv.addons));
};
