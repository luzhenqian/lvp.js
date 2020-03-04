var Lvp = require("../lib/lvp");
var myRules = require("./myRules");

var lvp = new Lvp({
  rules: myRules,
  defaultSuccessMessage: "data test success",
  defaultErrorMessage: "data test error"
});

test("lvp instance has required rule?", () => {
  // expect(lvp.ruleList).toContain(["required", "min", "max"]);
  expect(lvp.ruleList).toContain("required");
});

test("is email?", () => {
  expect(lvp.test({ value: "1@1.com", rules: "isEmail" }).status).toBe(true);
});

test("is china id card?", () => {
  expect(
    lvp.test({ value: "37133319891221002X", rules: "isCNIDCard" }).message
  ).toBe("data test success");
});
