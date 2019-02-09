import { add, subtract } from "./math";
import Print from './print';
import _ from "lodash";

let result = add(5, 3);
console.log("5 + 3 : ", result);

const k = _.join(["hoil", "zz", "dd"], "-");

console.log(k);
Print('hello hoils');

function dynamicLoad() {
  return import(/* webpackChunkName: "asyncHoilzz" */ './async').then(
    ({ default: asyncFunc }) => {
      asyncFunc();
    }
  )
}

dynamicLoad();

if (module.hot) {
  module.hot.accept("./math.js", function() {
    result = subtract(5, 7);
    console.log(result);
  });
}
