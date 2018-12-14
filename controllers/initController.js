// initController.js初始化路由，并且加载所有路由
// const IndexController = require('./indexController'); //引入首页相关路由控制器
// const Router = require('koa-router'); // 路由中间件

import IndexController from './indexController'; //引入首页相关路由控制器
import Router from 'koa-router'; // 路由中间件

const indexController = new IndexController(); //如果导出没new,就要实例化一次
const router = new Router();
// 挂载所有路由
const init = (app)=>{
  // 挂载路由启用
  app.use(router.routes());
  app.use(router.allowedMethods());

  router.get('/',indexController.actionIndex())
  router.get('/create', indexController.actionCreate());
  router.get('/view/:id', indexController.actionView());
  router.get('/update/:id', indexController.actionUpdate());

  router.post('/update', indexController.actionUpdatePost());
  router.post('/create', indexController.actionCreatePost());
  router.post('/delete', indexController.actionDelete());

}


export default init;
