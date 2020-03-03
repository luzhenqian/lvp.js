# Quick start

In theory, lvp.js is a completely non-invasive library. It can run on the browser or node.js, and there will be no compatibility conflict with any library and framework.

The code is demonstrated by ES6 by default.

```js
import Lvp from "lvp.js";
const lvp = new Lvp();
```

Lvp exports a constructor by default, and subsequent verifications are performed by manipulating the Lvp instance object.

Lvp supports two types of data validation, string and number.

The Lvp instance object has a test method, which is the main method for validation. The value being checked is called value.

Lvp's verification methods are roughly divided into two types, one is batch verification, and the other is single value verification. Let's demonstrate the effect of these two checks.

## Multi-value check

Suppose you want to verify the following data.

```js
var userInfo = {
  name: "Ellie",
  age: 17,
  personalBackground:
    "Students at Tsinghua University, his father is an associate professor at the Central University for Nationalities, and his mother is a nurse in the outpatient department of psychology at Beijing People's Hospital."
};
```

The verification rules are based on Chinese names to see if they are correct; they are over 18 years of age; their personal background is between 8 and 100 characters.

```js
var testResult = lvp.test([
  {
    value: userInfo.name,
    rules: "isCnName"
  },
  {
    value: 17,
    rules: { min: 18, message: "Minors are forbidden" }
  },
  {
    value: userInfo.personalBackground,
    rules: {
      min: 8,
      max: 100,
      message:
        "Personal background content must be in the range of 8-100 characters"
    }
  }
]);

if (testResult.status) {
  // verify the logic
  console.log(testResult.message);
} else {
  // Validation failed logic
  console.log(testResult.message); // 'Minors are not allowed to enter'
}
```

Multi-valued validation is often used to process a bunch of data, such as the most common form validation.

## Single value check

There is no essential difference between single-value verification and multi-value verification. You can choose according to your application scenario.

The following is an example of verifying compliance of a mailbox:

```js
var isEmail = lvp.test({
  value: "aili001010@gmail.com",
  rules: [{ name: "isEmail", message: "The mailbox format is incorrect" }]
});

console.log(isEmail); // {status: true, message: "Verification succeeded"}
```
