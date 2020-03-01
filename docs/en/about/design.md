# Design

## design concept

Lv's core logic is very simple. It does not depend on any other libraries, so its package size is very small.

Small and extraordinary, Lvphas a perfect edge detection mechanism.

The goal of Lvpis to solve business problems. So the core of Lvpis not at the programming level, but more at the business level. Lvpbuilt-in method list will not have methods like isDate, isNumber, isFunction. Because the industry already has many excellent solutions to these problems. Lvpis more about business things, such as checking e-mail, ID cards, telephones and other things.

Lvpdoes not interfere with forms or input events, although form validation is one of the main application scenarios for Lvp. When Lvpis used is entirely up to you. You can also extend the original validation rules to add your own custom rules.

Lv's applicable platform is very extensive, supporting browser, node.js, ~~Typescript~~. It also supports node.js Common-like specifications, AMD specifications, and ESM specifications. No compatibility issues with any framework, such as React, jQuery, Vue, etc.

## About combination check

There are currently no plans to implement combined verification. Whether it is combined verification or nested verification, it can be changed to simple verification by flattening, and the usage scenarios of combined verification are rare.

## About compatibility

In order to ensure compatibility, the source code is written using the ES5 specification and can be compatible to at least IE8. In the code, there is the function of detecting the running platform, which will automatically expand the major platforms. And through the tool to generate ES6 compatible module files, these will be completed automatically with each version update.

## Compare other solutions

There are not a few libraries with similar functions, such as validateator.js, moment. Or some framework-bound libraries, such as React's react-hook-form, formsy-react; Vue's vuelidate, vee-validate; jQuery's jquery-validation, etc.

In fact, they are more mature than current lvp.js, both in terms of functionality and code stability. But they all have some shortcomings or are not comfortable to use. lvp.js does not use those libraries as an opponent, nor does it copy the APIs of those libraries.

The lvp.js authors have almost used the libraries mentioned above. They are all good, but the author also thinks that there are some places where they can be better.

## Features

Let's talk about several features of lvp.js:

### 1. Configuration priority

There are many libraries that implement such chained calls.

```js
var price = 12;
validator
  .test(price)
  .required()
  .min(8)
  .max(60);
```

In fact, lvp.js also tried to do this in the early development stage, and the problem was that it was not easy to handle when customizing extended validation functions. But there are still at least two solutions.

The first solution is to use the square bracket `[]` method, and continue to use the pseudo code above.

```js
validator
  .test(price)
  .required()
  .min(8)
  .max(60)
  ["isDiscount"]();
```

The biggest problem with this method is that once the user misspells the function name, it will cause the highest level of code error in js, and the subsequent code will be suspended. As a library, this design is not desirable.

The second scheme is to add a uniform interface to adapt before calling the custom function, and then process and call the custom function correctly in the custom function.

```js
validator
  .test(price)
  .required()
  .min(8)
  .max(60)
  .custom(["isDiscount"]);
```

Although this problem can be solved, the author still believes that the configuration method is relatively better.

The advantage of chained calls is simplicity and elegance. The author even thought about coexistence of configuration and chained calls, but eventually gave up chained calls. The reason can continue to look down.

### 2. Minimalist API

The author of lvp.js has written an article explaining Js Array comprehensively, which introduces the various APIs of Array, more than 30 kinds of official, dozens of folk, I believe few people can remember the details in each API.

Cumbersome APIs represent more powerful features, but with them comes the cost of learning.

The reason for abandoning chained calls is this. The author believes that data verification can be solved by a few APIs, and there is no need to design a large number of APIs that have a single function but can hardly be used alone or have a very low usage rate. Design is good, but designing for design is bad. Think of express and koa.

lvp.js still has many APIs, which is a problem that cannot be avoided as a data validation library. But there are few core APIs, others are APIs for verifying data. You can search directly on the API of the official website, and then copy it to your configuration object. When you add a lot of custom logic, you can visit `lvp.rulesList` to get a list of rule names.

### 3. Localization

The main purpose of developing lvp.js is still to solve practical problems. As a Chinese developer, the author rarely finds out-of-the-box APIs for data verification. More often, he still has to write regular expressions to verify the data.

lvp.js comes with a large number of Chinese localization verification rules by default, which is not found in other class libraries. The verification logic is precision tested, so you can use it with confidence. This is also the biggest advantage of lvp.js at present.
