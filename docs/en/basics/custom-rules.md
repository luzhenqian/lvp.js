# Custom validation rules

The idea of ​​custom validation rules is the same as that of jQuery plugins or Vue plugins, but without them, the implementation is very simple.

You can collect and organize the rules that apply to your team or project, and package them into modules for easy multiple use.

There are two ways to customize rules.

#### 1. Set the rules field in the configuration parameter object of the Lv constructor

Lv's configuration object can currently set 3 properties, please see [lvOption Property List](/api/config-object.md) for details.

You can add custom validation functions by configuring the rules property.

The rules property also comes in two flavors.

##### 1.1 Configuration using object

In the form of object, you need to set the name attribute and logic attribute on the object. The name attribute is used as the validation rule name, and the logic attribute is the validation logic.

Assume a custom validation rule that checks if the data is number.

Example:

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

##### 1.2 Use function configuration

In the form of function, a named function is set for the elements in rules. The function name is used as the verification rule name and the function body is used as the verification logic.

Example:

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

The above two styles work exactly the same, which one depends on your habits.

The two styles can also be mixed, but this is not recommended.

#### 2. Use the addRules method of the Lv instance object

The addRules method is mainly used when the custom method is added after the Lv instance object is created.

The argument can be an array, an object, or a function.

Example:

```js
// function style
lv.addRules(function isNumber(value) {
  return (
    Object.prototype.toString.call(value) === "[object Number]" &&
    typeof value === "number" &&
    !isNaN(value) &&
    /^[0-9]+.?[0-9]\*\$/.test(value)
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
      /^[0-9]+.?[0-9]\*\$/.test(value)
    );
  }
});

// N rules
lv.addRules([
  {
    name: "isNumber",
    logic: function(value) {
      return (
        Object.prototype.toString.call(value) === "[object Number]" &&
        typeof value === "number" &&
        !isNaN(value) &&
        /^[0-9]+.?[0-9]\*\$/.test(value)
      );
    }
  }
]);
```

The effects of the above three methods are exactly the same. It should be noted that adding a rule with the same name will add the rule with the same name. This is similar to repeatedly assigning properties to object.

There is a similar method on the Lv instance object, addRule. Its function is to add a single rule, but it is not recommended that you use this method because it is an internal method. Using it does not guarantee security, so I will not go into the details of the function of addRule here. Whether you add N or 1 check rule. Whether you use function or object style. It is recommended that you use only the addRules method.
