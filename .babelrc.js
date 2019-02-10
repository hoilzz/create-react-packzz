module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
        targets: "> 0.25%, not dead"
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
  ]
};
