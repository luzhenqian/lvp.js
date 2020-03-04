# 设置默认值

有一种情况就是您在调用 test 方法时没有传入 message 属性，此时就会使用默认的 message 作为返回结果。

如下代码：

```js
var text = "hello,world.";
var tr = lvp.test({ value: text, rules: "reuqired" });
console.log(tr); // {status: true, message: "校验成功"}
```

这里的 "校验成功" 就是默认值。与之对应的还有 "校验失败"。

设置默认值有两种方式。

#### 1. 在 Lvp 构造参数中设置 [推荐]

您可以在创建 Lvp 实例时配置默认值。

```js
var lvp = new Lvp({
  defaultSuccessMessage: "data test success",
  defaultErrorMessage: "data test error"
});
```

#### 2. 修改 lvp 实例属性 [不推荐]

由于 defaultSuccessMessage 和 defaultErrorMessage 都是挂载在 lvp 实例上的两个属性，所以您也可以直接通过修改这两个属性来修改默认提示的值。

```js
lvp.defaultSuccessMessage = "data test success";
lvp.defaultErrorMessage = "data test error";
```
