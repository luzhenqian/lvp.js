# Set default value

In one case, when you call the test method without passing in the message property, the default message will be used as the return result.

The following code:

```js
var text = "hello, world.";
var tr = lvp.test({ value: text, rules: "reuqired" });
console.log(tr); // {status: true, message: "Verification succeeded"}
```

The "verification successful" here is the default value. Correspondingly, "verification failed".

There are two ways to set the default.

#### 1. Set in the Lvpconstruction parameter [Recommended]

You can configure default values when creating an Lvpinstance.

```js
var lvp = new Lvp({
  defaultSuccessMessage: "data test success",
  defaultErrorMessage: "data test error"
});
```

#### 2. Modify lvp instance properties [Not recommended]

Since defaultSuccessMessage and defaultErrorMessage are two properties mounted on the lvp instance, you can also modify the value of the default prompt directly by modifying these two properties.

```js
lvp.defaultSuccessMessage = "data test success";
lvp.defaultErrorMessage = "data test error";
```
