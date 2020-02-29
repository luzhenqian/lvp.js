# 自定义校验规则

自定义校验规则的思想和 jQuery 插件或是 Vue 插件是一样的，但没有它们复杂，实现的方式也非常简单。

您可以收集整理适用于您团队或项目的 rules，封装成模块，便于多次使用。

自定义规则的方式有两种。

#### 1. 在 Lv 构造函数的配置参数对象中设置 rules 字段

Lv 的配置对象目前可以设置 3 个属性，详细请查看 [lvOption 属性列表](/api/config-object.md)。

您可以通过配置 rules 属性来添加自定义校验函数。

rules 属性也有两种风格。

##### 1.1 使用 object 形式配置

使用 object 形式，就需要给对象设置 name 属性和 logic 属性。name 属性作为校验规则名，logic 属性是校验逻辑。

假设自定义一个校验数据是否为 number 的校验规则。

示例：

```js
var lv = new Lv({
  rules: [
    {
      name: "isNumber",
      logic: function(value) {
        return (
          Object.prototype.toString.call(value) === "[object Number]" &&
          typeof value === "number" &&
          !isNaN(value) &&
          /^[0-9]+.?[0-9]*$/.test(value)
        );
      }
    }
  ]
});
```

##### 1.2 使用 function 形式配置

使用 function 形式，rules 中的元素就要设置一个具名函数，函数名作为校验规则名，函数体作为校验逻辑。

示例：

```js
var lv = new Lv({
  rules: [
    function isNumber(value) {
      return (
        Object.prototype.toString.call(value) === "[object Number]" &&
        typeof value === "number" &&
        !isNaN(value) &&
        /^[0-9]+.?[0-9]*$/.test(value)
      );
    }
  ]
});
```

以上两种风格作用完全相同，具体采用哪一种由您的习惯而定。

两种风格也可以混用，但不推荐这么做。

#### 2. 使用 Lv 实例对象的 addRules 方法

addRules 方法主要是用于在 Lv 实例对象创建完成后再添加自定义方法时所调用的。

参数可以是一个数组、一个对象或者一个函数。

示例：

```js
// function style
lv.addRules(function isNumber(value) {
  return (
    Object.prototype.toString.call(value) === "[object Number]" &&
    typeof value === "number" &&
    !isNaN(value) &&
    /^[0-9]+.?[0-9]*$/.test(value)
  );
});

// object style
lv.addRules({
  name: "isNumber",
  logic: function(value) {
    return (
      Object.prototype.toString.call(value) === "[object Number]" &&
      typeof value === "number" &&
      !isNaN(value) &&
      /^[0-9]+.?[0-9]*$/.test(value)
    );
  }
});

// N 条规则
lv.addRules([
  {
    name: "isNumber",
    logic: function(value) {
      return (
        Object.prototype.toString.call(value) === "[object Number]" &&
        typeof value === "number" &&
        !isNaN(value) &&
        /^[0-9]+.?[0-9]*$/.test(value)
      );
    }
  }
]);
```

以上三种方式添加的效果都是完全一样的，需要注意的是：添加同名 rule，后添加的 rule 会覆盖原有的同名 rule。这类似于给 object 的属性重复赋值。

Lv 实例对象上还有一个类似的方法，addRule。它的功能是添加单个规则，但不建议您使用这个方法，因为它是内部方法，使用它并不保证安全，所以这里也不过多赘述 addRule 的功能。无论您添加 N 个校验规则，还是 1 个校验规则。无论您采用 function 风格，还是采用 object 风格。都建议您只使用 addRules 方法。
