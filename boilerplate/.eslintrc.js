module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "babel-eslint",
  rules: {
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0
  },
  env: {
    browser: true
  }
}