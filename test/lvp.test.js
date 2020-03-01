var Lvp = require("../lib/lvp");
var myRules = require("./myRules");

var lvp = new Lvp({ rules: myRules });
console.log(lvp.ruleList);

test("lvp instance has required rule?", () => {
  // expect(lvp.ruleList).toContain(["required", "min", "max"]);
  expect(lvp.ruleList).toContain("required");
});
