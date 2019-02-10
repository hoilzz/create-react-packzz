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
    "react-hot-loader/babel"
  ]
};
