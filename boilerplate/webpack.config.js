const webpackMerge = require('webpack-merge');
const argv = require('yargs').argv;
const commonConfig = require('./webpack/webpack.common.js');

const addons = addonsArg => {
  const addonNames = [...[addonsArg]].filter(Boolean);

  return addonNames.map(addonName =>
    require(`./webpack/addons/webpack.${addonName}.js`),
  );
};

module.exports = () => {
  const envConfig = require(`./webpack/webpack.${argv.env}.js`);

  return webpackMerge(
    commonConfig,
    envConfig,
    ...addons(argv.addons),
  );
};
