// 事件错误处理句柄
// const log4js = require('log4js'); // 打印错误日志
// log4js.configure({
//   // 输出源--type:文件(你也可定义xml),filename:输出的文件名
//   appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
//   // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
//   categories: { default: { appenders: ['cheese'], level: 'error',level: 'warn'} }
// });
// const logger = log4js.getLogger('cheese');

const errorHandler = {
  error(app,logger){
    app.use(async (ctx,next)=>{
      // 最先走的,尝试的先往下走
      try {
        await next();
      } catch (err) {
        logger.error(err);
        // 下看看公司需求显示页面
        ctx.status = err.status || 500; // 先读取报错状态,如果没就500
        ctx.body = await ctx.render('error'); // 显示页面
      }
    })
    app.use(async (ctx,next)=>{
      await next(); // 正常往下走,如果找不到页面才往回路走下面代码
      if(404 != ctx.status){
        return; // 不是404状态退出这块区域,进入上一层
      }
      // 根据实际业务设置状态码,SEO优化权重
      ctx.status = 404; // 可以设置200
      logger.error('err');
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="返回主页"></script>';
    })
  }
}

// module.exports = errorHandler;
export default errorHandler
