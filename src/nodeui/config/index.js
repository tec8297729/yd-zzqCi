// const join = require("path").join; // 路径组件
// const _ = require("lodash"); // 模块化JS组件包-函数式编程
import path from 'path';  // 路径组件
import _ from 'lodash'; // 模块化JS组件包-函数式编程
const urlRouter = '..';
let config = {
  "viewDir" : path.join(__dirname, urlRouter, "views"), // 模板文件目录
  "staticDir": path.join(__dirname, urlRouter,"assets") // 静态资源目录
}

// 判断环境变量-开发环境
if(process.env.NODE_ENV == "development"){
  const localConfig = {
    port:8888
  }
  config = _.extend(config,localConfig); //合并
}

// 正式上线环境变量
if(process.env.NODE_ENV == "production"){
  const prodConfig = {
    port:80
  }
  config = _.extend(config,prodConfig);
}

// 上面也可以使用new Map()实现,通过set get方法设置与获取...
// module.exports = config;
export default config
