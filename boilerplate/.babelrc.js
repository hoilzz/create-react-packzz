const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'cjs' : false,
        useBuiltIns: 'usage',
        targets: '> 0.25%, not dead',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    'react-hot-loader/babel',
  ],
};
