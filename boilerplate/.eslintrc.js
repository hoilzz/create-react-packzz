const resolve = require('resolve');
const path = require('path');

const webpackConfigRoot = path.resolve(
  __dirname,
  'webpack.config.js',
);

module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/webpack/**/*', webpackConfigRoot] },
    ],
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: resolve,
      },
    },
  },
};
