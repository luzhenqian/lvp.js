# <a>Lv.js</a>

Lv.js is a data validation library.

- Cross Js platform: lv.js supports umd, cmd, and esm specifications.
- Easy to use, ultra small size: The internal logic is simple to implement, there is no redundant design, trying to solve the most things with the least code.
- Highly customizable and non-invasive: You can customize the validation rules arbitrarily, and there are no compatibility issues with any framework.

## Installation

You can use npm

```bash
npm i lv.js
```

or cnd

```html
<script src="https://unpkg.com/browse/lv.js@last/"></script>
```

## Documentation

You can find the Lv.js documentation on [the website](https://lv.js.org).

## Examples

This is a simple example of a single value check,for more detailed examples, please check [here](https://lv.js.org/#/basics/quickstart)

```js
var phone = "15555555555";
var isPhone = lv.test({ value: phone, rules: "isCNPhone" });
```

## Other

Lv.js is [MIT licensed.](/LICENSE)
