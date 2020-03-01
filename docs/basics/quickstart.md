# 快速上手

理论上讲，lvp.js 是的完全无入侵性的库，它可以运行在浏览器或者 node.js 上，和任何库与框架都不会有兼容性的冲突。

代码默认以 ES6 来演示。

```js
import Lvpfrom "lvp.js";
const lvp = new Lvp();
```

Lvp默认导出的是一个构造函数，后续的校验，都通过操作 Lvp实例对象来完成。

Lvp支持验证两种类型的数据，string 和 number。

Lvp实例对象有一个 test 方法，这是用于校验的主方法。被校验的值，称为 value。

Lvp的校验方式大致分为两种，一种是批量校验，一种是单值校验。下面来演示这两种校验的效果。

## 多值校验

假设要校验如下一条数据。

```js
var userInfo = {
  name: "艾莉",
  age: 17,
  personalBackground:
    "清华大学在校生，父亲是中央民族大学副教授，母亲是北京人民医院心理门诊科护士。"
};
```

校验规则是以中国姓名为准则，查看姓名是否正确；年龄在 18 岁以上；个人背景在 8 到 100 个字符之间。

```js
var testResult = lvp.test([
  {
    value: userInfo.name,
    rules: "isCnName"
  },
  {
    value: 17,
    rules: { min: 18, message: "未成年禁止入内" }
  },
  {
    value: userInfo.personalBackground,
    rules: {
      min: 8,
      max: 100,
      message: "个人背景内容长度必须在8-100字符范围内"
    }
  }
]);

if (testResult.status) {
  // 校验通过的逻辑
  console.log(testResult.message);
} else {
  // 校验失败的逻辑
  console.log(testResult.message); // '未成年禁止入内'
}
```

多值校验常用于处理一堆数据，比如最常见的表单校验。

## 单值校验

单值校验与多值校验并没有什么本质的区别，完全可以按照您的应用场景来选择。

以下是一个校验邮箱是否合规的例子：

```js
var isEmail = lvp.test({
  value: "aili001010@gmail.com",
  rules: [{ name: "isEmail", message: "邮箱格式不正确" }]
});

console.log(isEmail); // {status: true, message: "校验成功"}
```
