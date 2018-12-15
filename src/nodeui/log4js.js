const koa = require('koa'); // 引入koa框架
const log4js = require('log4js'); // 打印错误日志
const app = new koa(); //koa实例
log4js.configure({
  // 输出源--type:文件(你也可定义xml),filename:输出的文件名
  appenders: { cheese: { type: 'file', filename: './log/cheese.log' } },
  // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
  categories: { default: { appenders: ['cheese'], level: 'error',level: 'warn'} }
  });

exports.uselog = ()=> {
  var logger = log4js.getLogger();
  // 监听错误--容错处理
  app.on('error', (err, ctx) => {
    log.error('server error', err, ctx);
    if (err.status == 500) {
      logger.error('500服务器错误:' + ctx);
    }else{
      logger.error(err.status + '--server error:' + ctx);
    }
  });
}