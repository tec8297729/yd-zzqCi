const IndexController = require('./indexController'); 
const indexController = new IndexController(); 

const Router = require('koa-router'); 
const router = new Router();
const init = (app)=>{
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
