var Lv = require("../lib/lv");
var myRules = require("./myRules");

var lv = new Lv({ rules: myRules });
console.log(lv.ruleList);

test("lv instance has required rule?", () => {
  // expect(lv.ruleList).toContain(["required", "min", "max"]);
  expect(lv.ruleList).toContain("required");
});
