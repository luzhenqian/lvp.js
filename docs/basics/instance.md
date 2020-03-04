# Lvp 实例

数据校验功能，是绝对单一的。所以推荐在您的应用程序中使用唯一的 Lvp 实例。Lvp 没有像 jQuery 那样使用单例模式保证单例。因为同时存在多个 Lvp 实例也并不会对应用有什么影响。

```js
var lvp = new Lvp({
  // 配置
});
```

在创建 Lvp 实例时，您可以传入一个配置对象。您也可以在 [API 文档](/api/config-object.md) 中查看更完整的配置列表。

该实例对象的原型具有很多内置的校验方法。

```js
// 可以通过该 API 查看
Object.getPrototypeOf(lvp);
```

而您扩展的方法将会添加在 Lvp 实例本身上面。

所有的校验规则属性名都可以在 ruleList 属性上面获取到。

```js
lvp.ruleList;
```
