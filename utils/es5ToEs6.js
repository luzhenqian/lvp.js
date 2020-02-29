#!/usr/bin/env node
// es5 to es6
// idea: lv.min.js to lv.mjs

// command: 5t6 lv.min.js -o lv.mjs -ed lv -e x

// -o output缩写，输出文件
// -ed export default 缩写 后面的参数可以是函数名也可以是对象名
// -e export 缩写，后面参数可以时函数名、对象名或变量名
// -h help 帮助
var fs = require("fs");

var args = process.argv.slice(2);

function getParamValue(paramName) {
  return args.find(function(item, index) {
    return args[index - 1] === paramName;
  });
}

// TODO: 待修复 找到 -e 到下一个 以 - 开头参数中间的所有参数
function getParamValueList(paramName) {
  var index = args.findIndex(function(item, index) {
    return args[index - 1] === paramName;
  });
  var endIndex = args.findIndex(function(item, index) {
    return item[0] !== "-";
  });
}

// TODO: 考虑 input file 也改为数组
var inputFilePath = getParamValue("-i");
// if (!inputFilePath) console.warn("必选参数 -i 异常");
var outputFilePath = getParamValue("-o");
// if (!inputFilePath) console.warn("必选参数 -o 异常");
var exportDefaultName = getParamValue("-ed");
// TODO: 导出的是个列表
var exportNameList = getParamValueList("-e");

if (inputFilePath) {
  Transformation();
}

function Transformation() {
  fs.readFile(inputFilePath, function(err, data) {
    if (!err) {
      var dataText = data.toString();
      var newDataText = dataText.replace(
        "function " + exportDefaultName + "(",
        "export default function " + exportDefaultName + "("
      );
      fs.writeFile(outputFilePath, newDataText, function(err) {
        if (err) {
          console.log("生成失败");
        } else {
          console.log("转换成功");
        }
      });
    } else {
      console.error(`文件 ${inputFilePath} 读取失败`);
    }
  });
}
