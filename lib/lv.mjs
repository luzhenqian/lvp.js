export default function Lv(e){var t,s={browser:"browser",nodejs:"nodejs",amd:"amd"};function n(e){return"object"==typeof e&&"object"===Object.prototype.toString.call(e).substr(1,6)}"object"==typeof window&&(t=s.browser),"object"==typeof exports&&(t=s.nodejs),"function"==typeof define&&(t=s.define),t===s.amd&&define.amd&&define(Lv);var r=s.browser===t||s.amd===t;if(this.addRule=function(e){if(("object"==typeof e||"function"==typeof e)&&"arguments"in e)this[e.name]=e;else{if("object"!=typeof e||!e.name||!e.logic)return;this[e.name]=e.logic}this[e.name].__isRule__=!0},this.addRules=function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.addRule(e[t]);else"object"==typeof e||"function"==typeof e?this.addRule(e):function(e){var t=Array.prototype.slice.call(arguments,1,arguments.length);t.unshift(r?"%c lv info: %c "+e:"lv info: "+e,r?"color: rgb(41, 182, 246)":"",r?"color: rgb(1, 87, 155)":"")}("rules 添加错误")},e=e||{},this.defaultSuccessMessage=e.defaultSuccessMessage||"校验成功",this.defaultErrorMessage=e.defaultErrorMessage||"校验失败",Array.isArray(e.rules))for(var i=0;i<e.rules.length;i++)this.addRules(e.rules[i]);Object.defineProperty(this,"ruleList",{get:function(){var e=[];if(Object.getPrototypeOf)for(var t in Object.getPrototypeOf(this))e.push(t);else if(this.__proto__)for(var t in this.__proto__)e.push(t);for(var s in this)s.__isRule__&&e.push(s);return e}}),this.test=function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++){if(s=r.call(this,e[t].value,e[t].rules,e[t].message))return s}return{status:!0,message:this.defaultSuccessMessage}}var s;return n(e)?(s=r.call(this,e.value,e.rules,e.message))?s:{status:!0,message:this.defaultSuccessMessage}:{status:!1,message:this.defaultErrorMessage};function r(e,t,s){if(Array.isArray(t))for(var r=0;r<t.length;r++){var i=t[r];if(o=this.pass(e,i,s))return o}else if("string"==typeof t){if(o=this.pass(e,t,s))return o}else if(n(t)){var o;if(o=this.pass(e,t.name,t.params,t.message))return o}}},this.pass=function(e,t,s){var r={status:!1,message:this.defaultErrorMessage};if(n(t)){if(t.required&&!this.required(e))return t.message&&(r.message=t.message),r;if(t.min&&!this.min(e,t.min))return t.message&&(r.message=t.message),r;if(t.max&&!this.max(e,t.max))return t.message&&(r.message=t.message),r;if(t.name&&this[t.name]&&!this[t.name](e,t.params))return t.message&&(r.message=t.message),r}else if("string"==typeof t&&this[t]&&!this[t](e,t))return s&&(r.message=s),r},Lv.prototype.required=function(e){if(e)return!0},Lv.prototype.min=function(e,t){return"number"==typeof e?t<e:"string"==typeof e?e.length>t:void 0},Lv.prototype.max=function(e,t){return"number"==typeof e?e<t:"string"==typeof e?e.length<t:void 0},Lv.prototype.isEmail=function(e){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e)},Lv.prototype.isCNIDCard=function(e){return/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e)},Lv.prototype.isHttpURL=function(e){return/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(e)},Lv.prototype.isImage=function(e){return/\w+\\.(jpg|gif|bmp|png|webp)/.test(e)},Lv.prototype.isCNPhone=function(e){return/^1[3456789]\d{9}$/.test(e)},Lv.prototype.isCNTEL=function(e){return/\d{3}-\d{8}|\d{4}-\d{7}/.test(e)},Lv.prototype.isCNChar=function(e){return/^[\u4e00-\u9fa5]+$/.test(e)}}"object"==typeof exports&&(module.exports=Lv);