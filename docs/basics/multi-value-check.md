# 多值校验

更推荐您使用多值校验来校验您的数据，因为表单验证是 Lvp 的主要使用场景之一。

比如在您的程序中，有如下一条订单数据，包含订单编号，身份证号和手机号。

```js
var orderInfo = {
  orderId: "tb12395x5zv4003y",
  idCard: "37188019840918666X",
  phone: "18854100312"
};
```

您想校验身份证（idCard）和手机号（phone）是否合规，那么就可以使用多值校验。下面是校验的方法。

```js
var lvp = new Lvp();
var tr = lvp.test([
  {
    value: orderInfo.idCard,
    rules: "isCNIDCard",
    message: "身份证格式错误"
  },
  {
    value: orderInfo.phone,
    rules: "isCNPhone",
    message: "手机号格式错误"
  }
]);
```

lvp 对象在多值校验时，接收的是一个 Array 类型的配置对象参数。该配置对象需要具有 3 个属性。

| value                                                    | rules                                              | message                           |
| -------------------------------------------------------- | -------------------------------------------------- | --------------------------------- |
| 要校验的值，必选，类型只能是 string 或者 number 两者之一 | 校验规则，必选，类型可以是 string、object 或 array | 错误信息，可选，类型只能是 string |

您可以通过 test 方法的返回值 testResult 来查看校验结果。

```js
console.log(tr); // {status: true, message: "校验成功"}
```

testResult 返回的结果永远是一个具有 status 和 message 两个属性的简单对象。

status 属性是一个 boolean 类型的值，代表是否校验通过，message 是您在之前的配置参数中自定义的数据。

然后，您可以通过判断 status 的值来继续处理您要做的事情，比如把数据发送给后端接口，或者弹出错误提示，让用户重新填写他的数据。

```js
if (tr.status) {
  fetch("https://example.com/order", { body: orderInfo });
} else {
  alert(tr.message);
}
```

注意：当您在调用 lvp.test 传入的配置对象参数格式不正确时，lvp 会自动忽略校验规则，并认为校验通过。

比如如下代码：

```js
var tr2 = lvp.test([{ value: "🐻", rules: 1 }]);
```

此时的 tr2 的值就是 `{status: true, message: "校验成功"}`。

如果您是在开发模式下，可以在控制台得到类似如下提示：

```text
lvp warn:  校验规则 rules 参数类型不支持，当前传入参数类行为：number，rules 仅支持 Array 和 String 类型参数。
```

如果您使用的是生产环境的源代码，控制台就不会有任何提示。
