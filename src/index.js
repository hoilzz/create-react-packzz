import { add, subtract } from "./math";
import _ from "lodash";

let result = add(5, 3);
console.log("5 + 3 : ", result);

const k = _.join(["hoil", "zz", "dd"], "-");

console.log(k);

if (module.hot) {
  module.hot.accept("./math.js", function() {
    result = subtract(5, 7);
    console.log(result);
  });
}
