var Lv = require("../lib/lv");
var lv = new Lv();
var testResult = lv.test([
  {
    value: 3,
    rules: [{ min: 2, message: "最小不能为2" }]
  }
]);

console.log(`test result status: ${testResult.status}`);
console.log(`test result message: ${testResult.message}`);

var tr2 = lv.test("123");
