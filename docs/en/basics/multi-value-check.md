# Multi-value check

It is more recommended that you use multi-value validation to validate your data, as form validation is one of the main use cases for Lvp.

For example, in your program, there is the following order data, including the order number, ID card number and mobile phone number.

```js
var orderInfo = {
  orderId: "tb12395x5zv4003y",
  idCard: "37188019840918666X",
  phone: "18854100312"
};
```

You want to verify that the ID card and phone number are compliant, then you can use multi-value verification. The following is the verification method.

```js
var lvp = new Lvp();
var tr = lvp.test([
  {
    value: orderInfo.idCard,
    rules: "isIDCard",
    message: "Incorrect ID format"
  },
  {
    value: orderInfo.phone,
    rules: "isPhone",
    message: "Mobile phone number is malformed"
  }
]);
```

When the lvp object is multi-valued, it receives an Array type configuration object parameter. The configuration object needs to have 3 attributes.

| value                                                                              | rules                                                         | message                                              |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| The value to be checked is mandatory, the type can only be one of string or number | Check rule, required, the type can be string, object or array | Error message, optional, the type can only be string |

You can see the verification result by the testResult return value testResult.

```js
console.log(tr); // {status: true, message: "Verification succeeded"}
```

The result returned by testResult is always a simple object with status and message properties.

The status attribute is a boolean value, which indicates whether the check is passed. The message is the data you customized in the previous configuration parameters.

Then, you can continue to process things you want to do by judging the value of status, such as sending data to the back-end interface, or popping up an error prompt to let the user refill his data.

```js
if (tr.status) {
  fetch("https://example.com/order", { body: orderInfo });
} else {
  alert(tr.message);
}
```

Note: When the format of the configuration object parameters passed in the call to lvp.test is incorrect, lvp will automatically ignore the verification rules and consider the verification to pass.

For example, the following code:

```js
var tr2 = lvp.test([{ value: "🐻", rules: 1 }]);
```

The value of tr2 at this time is `{status: true, message:" Verification succeeded "}`.

If you are in development mode, you can get a prompt similar to the following in the console:

```text
lvp warn: Validation rules The rule parameter type is not supported. The current behavior of the incoming parameter class: number, rules only support Array and String type parameters.
```

If you are using source code from a production environment, the console will not prompt you.
