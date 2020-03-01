# 配置对象

Lvp的构造参数是一个配置对象，称为 lvpOption。可以在创建 lvp 实例对象时传入配置信息，影响 lvp 实例对象的行为。

## defaultSuccessMessage

- 类型：`string`
- 默认值：`校验成功`

默认的校验成功提示。

## defaultErrorMessage

- 类型：`string`
- 默认值：`校验失败`

默认的校验失败提示。

## rules

- 类型：`Array`
- 默认值：`[]`

自定义的校验逻辑列表。数组的元素有两种格式，第一种是命名函数，第二种是对象。
