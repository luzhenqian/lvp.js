# Single value check

Single-valued check and multi-valued check are very similar.

There are two ways of single value verification.

#### 1. Use the test method [Recommended]

You can pass in an array or an object, but the way you use objects is more recommended.

For example, check if the phone number is normal.

```js
var phone = "15555555555";
var isPhone = lv.test({ value: phone, rules: "isCNPhone" });
```

The advantage of this is that even if your rules are incorrectly filled, there will not be any exceptions that affect the continued operation of the program.

#### 2. Call using method name [Not recommended]

Lv does not restrict calling methods on the lv instance directly. You can directly call methods on the lv instance, or use square brackets [[] `.

Take the verification mobile phone number as an example:

```js
var phone = "15555555555";
var isPhone = lv.isPhone(phone);
// or
// var isPhone = lv ['isPhone'] (phone);
```

The return value isPhone is a boolean value.

However, if called in this way, it is possible to get an exception that directly interrupts subsequent programs.

Suppose your function name was accidentally written incorrectly:

```js
var isPhone = lv.isphone(phone);
```

You will get fatal error:

```text
Uncaught TypeError: lv.isphone is not a function
```

Therefore, you must write code similar to the following to prevent code exceptions:

```js
var isPhone =
  "isPhone" in lv && "function" == typeof lv.isPhone && lv.isPhone(phone);
```

Another reason why you are not recommended to do this is that this approach is no different from writing a verification function directly to call it. So why do you need to use this library?
