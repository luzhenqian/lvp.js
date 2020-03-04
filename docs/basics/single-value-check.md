# 单值校验

单值校验和多值校验非常类似。

单值校验有两种方式。

#### 1. 使用 test 方法 [推荐]

您可以传入一个数组或者是一个对象，但更推荐您使用对象的方式。

比如校验手机号是否正常。

```js
var phone = "15555555555";
var isPhone = lvp.test({ value: phone, rules: "isCNPhone" });
```

这样做的好处是，即使您的 rules 规则填写错误，也不会产生任何影响程序继续运行的异常。

#### 2. 使用方法名调用 [不推荐]

Lvp 并没有限制直接调用 lvp 实例上的方法，您可以直接调用 lvp 实例上的方法，或者使用方括号 `[]` 的方式来调用。

同样拿校验手机号来举例：

```js
var phone = "15555555555";
var isPhone = lvp.isPhone(phone);
// or
// var isPhone = lv['isPhone'](phone);
```

此时的返回值 isPhone 就是一个 boolean 值。

但是这样调用，就有可能得到一个直接中断后续程序运行的异常。

假设您的函数名不小心写错了：

```js
var isPhone = lvp.isphone(phone);
```

就会得到致命的错误：

```text
Uncaught TypeError: lvp.isphone is not a function
```

所以，您必须写类似如下代码来防止代码的异常：

```js
var isPhone =
  "isPhone" in lvp && "function" == typeof lvp.isPhone && lvp.isPhone(phone);
```

不建议您这么做的另一个原因是，这种做法和您直接写一个校验函数来调用没什么两样。既然如此，为什么还需要使用这个库呢？
