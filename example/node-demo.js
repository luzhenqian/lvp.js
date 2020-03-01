var Lvp= require("../lib/lvp");
var lvp = new Lvp();
var testResult = lvp.test([
  {
    value: 3,
    rules: [{ min: 2, message: "最小不能为2" }]
  }
]);

console.log(`test result status: ${testResult.status}`);
console.log(`test result message: ${testResult.message}`);

var tr2 = lvp.test("123");
