// const koa = require('koa'); // 引入koa框架
// const statics = require('koa-static'); //静态目录中间件
// const render = require('koa-swig'); // html渲染模板引擎
// const co = require('co'); // co组件,和swig配合使用
// // 以下非koa组件
// const log4js = require('log4js'); // 打印错误日志
// const bodyParser = require('koa-bodyparser'); //解析POST数据请求
// const init = require('./controllers/initController'); // 初始化所有路由
// const config = require('./config'); // 配置node文件
// const errorHandler = require('./middleawares/errorHandler'); // 处理错误页面
// const fetch = require('node-fetch'); // 请求接口组件

import koa from 'koa'; // 引入koa框架
import statics from 'koa-static'; //静态目录中间件
import render from 'koa-swig'; // html渲染模板引擎
import co from 'co'; // co组件,和swig配合使用
// // 以下非koa组件
import log4js from 'log4js'; // 打印错误日志
import bodyParser from 'koa-bodyparser'; //解析POST数据请求
import init from './controllers/initController'; // 初始化所有路由
import config from './config'; // 配置node文件
import errorHandler from './middleawares/errorHandler'; // 处理错误页面
import fetch from 'node-fetch';
import 'babel-polyfill'; // gulp编译需要


const app = new koa(); //koa实例

log4js.configure({
  // 输出源--type:文件(你也可定义xml),filename:输出的文件名
  appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
  // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
  categories: { default: { appenders: ['cheese'], level: 'error',level: 'warn'} }
});
const logger = log4js.getLogger('cheese');
// 配置渲染html相关参数-co插件
app.context.render = co.wrap(render({
  root: config.viewDir, // 指定目录，在这下面找index.html
  autoescape: true,
  ext: 'html',
  writeBody: false
}));

app.use( statics( config.staticDir ) ); // 静态文件目录
app.use(bodyParser()); //解析POST数据请求
errorHandler.error(app,logger); // 处理错误打印日志

init(app); // 初始化所有路由(引入app),为后续app.use挂载一些初始化东西使用


// 启用服务
app.listen(config.port,()=>{
  console.log(`服务启动成功 http://localhost:${config.port}`)
});
