import { add, subtract } from "./math";

let result = add(5, 3);
console.log("5 + 3 : ", result);

if (module.hot) {
  module.hot.accept("./math.js", function() {
    result = subtract(5, 7);
    console.log(result);
  });
}
