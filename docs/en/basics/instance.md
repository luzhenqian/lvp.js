# Lv Instance

The data verification function is absolutely single. So it is recommended to use a unique Lv instance in your application. Lv does not guarantee singletons using the singleton pattern like jQuery. Because there are multiple Lv instances at the same time, it will not affect the application.

```js
var lv = new Lv ({ // configure });
```

When creating an Lv instance, you can pass in a configuration object. You can also see a more complete list of configurations in [API Documentation] (/ api / config-object.md).

The prototype of this instance object has many built-in validation methods.

```js
// can be viewed via this API
Object.getPrototypeOf(lv);
```

The methods you extend will be added to the Lv instance itself.

All validation rule attribute names can be obtained on the ruleList attribute.

```js
lv.ruleList;
```
