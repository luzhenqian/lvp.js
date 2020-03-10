var Lvp = require("../lib/lvp");
var myRules = [
  {
    name: "isFibonacci",
    logic: function(value) {
      function fibonacci() {
        if (value == 0) {
          return 0;
        } else if (value == 1) {
          return 1;
        }
      }
      return fibonacci(value - 1) + fibonacci(value - 2);
    }
  },
  // 错误示例
  "🐖"
];

var lvp = new Lvp({
  rules: myRules,
  defaultSuccessMessage: "data test success",
  defaultErrorMessage: "data test error"
});

lvp.addRules(function isLoginNumber(value) {
  return !/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value);
}, /* 错误示例 */ "🐱");

lvp.addRules([
  function isOne(value) {
    return value === 1;
  },
  {
    name: "isTwo",
    logic: function(value) {
      return value === 2;
    }
  }
]);

lvp.test([
  {
    value: 1,
    rules: "isOne"
  },
  // 错误示例
  { value: {}, rules: {} }
]);

// 错误示例
lvp.test("🐱");

lvp.test({ value: "hi", rules: { required: true, min: 1, max: 3 } });
lvp.test({ value: "hi", rules: { required: false, min: 1, max: 3 } });
lvp.test({ value: "hi", rules: { required: true, min: 3, max: 4 } });
lvp.test({ value: "hi", rules: { required: true, min: 1, max: 2 } });
lvp.test({
  value: "hi",
  rules: {
    required: true,
    min: 1,
    max: 3,
    name: "isCNPhone",
    message: "校验error"
  }
});

test("is not required?", () => {
  expect(lvp.test({ value: void 0, rules: { required: true } }).status).toBe(
    false
  );
});

test("lvp instance has required rule?", () => {
  // expect(lvp.ruleList).toContain(["required", "min", "max"]);
  expect(lvp.ruleList).toContain("required");
});

test("lvp instance has isTwo rule?", () => {
  expect(lvp.ruleList).toContain("isTwo");
});

test("> 1, and < 3?", () => {
  expect(lvp.test({ value: 2, rules: [{ min: 1, max: 3 }] }).status).toBe(true);
});

test("is email?", () => {
  expect(lvp.test({ value: "1@1.com", rules: "isEmail" }).status).toBe(true);
});

test("is china id card?", () => {
  expect(
    lvp.test({ value: "37133319891221002X", rules: "isCNIDCard" }).message
  ).toBe("data test success");
});

test("is http or https URL?", () => {
  expect(
    lvp.test({
      value: "https://lvp.js.org/#/basics/multi-value-check",
      rules: "isHttpURL"
    }).status
  ).toBe(true);
});

test("is image?", () => {
  expect(
    lvp.test({ value: "/dfafa/dfasfasjk/fdajflka.jpg", rules: "isImage" })
      .status
  ).toBe(true);
});

test("is china phone number?", () => {
  expect(lvp.test({ value: "15555555889", rules: "isCNPhone" }).status).toBe(
    true
  );
});

test("is china TEL number?", () => {
  expect(lvp.test({ value: "0555-5555555", rules: "isCNTEL" }).status).toBe(
    true
  );
});

test("is CNChar ?", () => {
  expect(lvp.test({ value: "我是汉字", rules: "isCNChar" }).status).toBe(true);
});

// 自定义规则测试
test("is one?", () => {
  expect(lvp.test({ value: 2, rules: "isOne", message: "不是1" }).message).toBe(
    "不是1"
  );
});
