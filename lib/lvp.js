"object" == typeof exports && (module.exports = Lvp); // 兼容 node CommonJS-like 规范
function Lvp(lvpOption) {
  // 检测运行环境
  var env,
    envType = { browser: "browser", nodejs: "nodejs", amd: "amd" };
  // 针对不同平台进行兼容
  "object" == typeof window && (env = envType.browser);
  "object" == typeof exports && (env = envType.nodejs);
  "function" == typeof define && (env = envType.define);
  // if (env === envType.nodejs) module.exports = Lv; // 兼容 node CommonJS-like 规范
  if (env === envType.amd) define.amd && define(Lvp); // 兼容 AMD 规范
  // 工具函数
  function isObject(object) {
    return (
      "object" === typeof object &&
      "object" === Object.prototype.toString.call(object).substr(1, 6)
    );
  }
  var isBrowser = envType.browser === env || envType.amd === env,
    info = function(message) {
      var restParams = Array.prototype.slice.call(
        arguments,
        1,
        arguments.length
      );
      restParams.unshift(
        isBrowser ? "%c lvp info: %c " + message : "lvp info: " + message,
        isBrowser ? "color: rgb(41, 182, 246)" : "",
        isBrowser ? "color: rgb(1, 87, 155)" : ""
      );
      console.info.apply(null, restParams);
    },
    warn = function(message) {
      console.warn(
        isBrowser ? "%c lvp warn: %c " + message : "lvp warn: " + message,
        isBrowser ? "color: rgb(242, 117, 115)" : "",
        isBrowser ? "color: rgb(183, 28, 28 )" : ""
      );
    };

  /**
   * 添加自定义规则 单条
   * @param {Object} rule
   * @return {boolean|void}
   */
  this.addRule = function(rule) {
    if (
      ("object" == typeof rule || "function" == typeof rule) &&
      "arguments" in rule
    ) {
      // function style
      this[rule.name] = rule;
    } else if ("object" == typeof rule && rule.name && rule.logic) {
      // object style
      this[rule.name] = rule.logic;
    } else {
      return;
    }
    this[rule.name].__isRule__ = true;
  };

  /**
   * 添加自定义规则 入口函数 校验 rule 类型
   * @param {Object} rules
   * @return {boolean|void}
   */
  this.addRules = function(rules) {
    if (Array.isArray(rules)) {
      for (var i = 0; i < rules.length; i++) {
        this.addRule(rules[i]);
      }
    } else if ("object" == typeof rules || "function" == typeof rules) {
      this.addRule(rules);
    } else {
      info("rules 添加错误");
    }
  };

  // 配置对象
  !lvpOption && (lvpOption = {});
  this.defaultSuccessMessage = lvpOption.defaultSuccessMessage || "校验成功";
  this.defaultErrorMessage = lvpOption.defaultErrorMessage || "校验失败";
  if (Array.isArray(lvpOption.rules)) {
    for (var i = 0; i < lvpOption.rules.length; i++) {
      this.addRules(lvpOption.rules[i]);
    }
  }

  // 获取当前校验规则列表，IE8 不支持
  Object.defineProperty(this, "ruleList", {
    get: function() {
      var _rulesList = [];
      // 内置校验 API
      if (Object.getPrototypeOf) {
        for (var builtInRuleAPIName in Object.getPrototypeOf(this)) {
          _rulesList.push(builtInRuleAPIName);
        }
      } else if (this.__proto__) {
        for (var builtInRuleAPIName in this.__proto__) {
          _rulesList.push(builtInRuleAPIName);
        }
      }
      // 自定义校验 API
      for (var ruleAPIName in this) {
        if (ruleAPIName.__isRule__) _rulesList.push(ruleAPIName);
      }
      return _rulesList;
    }
  });

  /**
   * 校验总入口函数
   * @param {Object[]|Object} data
   * @returns {Object|void}
   */
  this.test = function(data) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        var testResult = _test.call(
          this,
          data[i].value,
          data[i].rules,
          data[i].message
        );
        if (testResult) return testResult;
      }
      return { status: true, message: this.defaultSuccessMessage };
    } else if (isObject(data)) {
      var testResult = _test.call(this, data.value, data.rules, data.message);
      if (testResult) return testResult;
      return { status: true, message: this.defaultSuccessMessage };
    } else {
      warn(
        "校验函数 test 参数类型不支持，当前传入参数类行为：" +
          typeof data +
          "，test 仅支持 Array 和 Object 类型参数。"
      );
      return { status: false, message: this.defaultErrorMessage };
    }

    function _test(value, rules, message) {
      if (Array.isArray(rules)) {
        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i],
            pass = this.pass(value, rule, message);
          if (pass) return pass;
        }
      } else if ("string" === typeof rules) {
        var pass = this.pass(value, rules, message);
        if (pass) return pass;
      } else if (isObject(rules)) {
        var pass = this.pass(value, rules.name, rules.params, rules.message);
        if (pass) return pass;
      } else {
        warn(
          "校验规则 rules 参数类型不支持，当前传入参数类行为：" +
            typeof rules +
            "，rules 仅支持 Array 和 String 类型参数。"
        );
      }
    }
  };

  /**
   * 内部校验函数
   * @param {string} value
   * @param {Rules} rules
   * @return {Result}
   */
  this.pass = function(value, rules, message) {
    var errorResult = { status: false, message: this.defaultErrorMessage };
    if (isObject(rules)) {
      if (rules.required) {
        if (!this.required(value)) {
          rules.message && (errorResult.message = rules.message);
          return errorResult;
        }
      }
      if (rules.min) {
        if (!this.min(value, rules.min)) {
          rules.message && (errorResult.message = rules.message);
          return errorResult;
        }
      }
      if (rules.max) {
        if (!this.max(value, rules.max)) {
          rules.message && (errorResult.message = rules.message);
          return errorResult;
        }
      }
      if (rules.name && this[rules.name]) {
        if (!this[rules.name](value, rules.params)) {
          rules.message && (errorResult.message = rules.message);
          return errorResult;
        }
      }
    } else if ("string" === typeof rules) {
      if (this[rules]) {
        if (!this[rules](value, rules)) {
          message && (errorResult.message = message);
          return errorResult;
        }
      }
    }
  };

  /**
   * 以下为内置校验规则
   * required 非空
   * min 最小
   * max 最大
   * isEmail 邮箱
   * isCNIDCard 中国大陆身份证号
   * isCNPhone 中国手机号
   * isCNTEL 中国固话
   * isHttpURL http协议 URL
   * isImage 图片
   */

  /**
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.required = function(value) {
    if (value) return true;
  };

  /**
   * @param {string|number} value
   * @param {string|number} minVal
   * @return {boolean}
   */
  Lvp.prototype.min = function(value, minVal) {
    if (typeof value === "number") {
      return value > minVal;
    } else if (typeof value === "string") {
      return value.length > minVal;
    }
  };

  /**
   * @param {string|number} value
   * @param {string|number} maxVal
   * @return {boolean}
   */
  Lvp.prototype.max = function(value, maxVal) {
    if (typeof value === "number") {
      return value < maxVal;
    } else if (typeof value === "string") {
      return value.length < maxVal;
    }
  };

  /**
   * 校验电子邮箱地址
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isEmail = function(value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
  };

  /**
   * 校验中国身份证 18位
   * TODO: 15位
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isCNIDCard = function(value) {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  };

  /**
   * 校验是否为 http URL，包含https
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isHttpURL = function(value) {
    return /http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(value);
  };

  /**
   * 校验是否为图片
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isImage = function(value) {
    return /\w+\\.(jpg|gif|bmp|png|webp)/.test(value);
  };

  /**
   * 校验手机号
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isCNPhone = function(value) {
    return /^1[3456789]\d{9}$/.test(value);
  };

  /**
   * 校验固定电话 例如 0511-5555555 021-88888888
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isCNTEL = function(value) {
    return /\d{3}-\d{8}|\d{4}-\d{7}/.test(value);
  };

  /**
   * 校验中文字符
   * @param {string} value
   * @return {boolean}
   */
  Lvp.prototype.isCNChar = function(value) {
    return /^[\u4e00-\u9fa5]+$/.test(value);
  };
}
