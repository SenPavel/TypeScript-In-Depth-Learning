/// <reference path="utility.functions.ts" />

const result = Utility.Fees.calculateLateFee(6);
console.log(result);
const secondResult = Utility.maxBooksAllowed(30);
console.log(secondResult);

import Util = Utility.Fees;
console.log(Util.calculateLateFee(10));