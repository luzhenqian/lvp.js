# Set default value

In one case, when you call the test method without passing in the message property, the default message will be used as the return result.

The following code:

```js
var text = "hello, world.";
var tr = lv.test({ value: text, rules: "reuqired" });
console.log(tr); // {status: true, message: "Verification succeeded"}
```

The "verification successful" here is the default value. Correspondingly, "verification failed".

There are two ways to set the default.

#### 1. Set in the Lv construction parameter [Recommended]

You can configure default values when creating an Lv instance.

```js
var lv = new Lv({
  defaultSuccessMessage: "data test success",
  defaultErrorMessage: "data test error"
});
```

#### 2. Modify lv instance properties [Not recommended]

Since defaultSuccessMessage and defaultErrorMessage are two properties mounted on the lv instance, you can also modify the value of the default prompt directly by modifying these two properties.

```js
lv.defaultSuccessMessage = "data test success";
lv.defaultErrorMessage = "data test error";
```
