// 这里是indexController.js文件
// const indexMd = require('../models/indexMd'); // 统一接口fetch封装
// const url = require('url').URLSearchParams;
import indexMd from '../models/indexMd'; // 统一接口fetch封装
// 读取后台相应API请求,(search,{id:22}) 搜索id=22文章
function YiiApiGet(str, obj) {
  let host = 'http://test.fybqq.com/web/index.php?r=book/';
  let apiRouter = {
    index: `${host}indexjson`, // 读取全部数据
    search: `${host}viewjson`, // 自定义搜索可id,可作者author
    delete: `${host}deletejson`, // 删除数据
    create: `${host}createjson`, // 创建数据
    update: `${host}updatejson`
  };
  if (!apiRouter[str]) return;
  if (!obj) {
    return apiRouter[str];
  } else {
    let newStr = apiRouter[str];
    for (const key in obj) {
      newStr += `&${key}=${obj[key]}`
    }
    return newStr;
  }
}


// 首页相关路由
class indexController {
  constructor(){}
  // 主页
  actionIndex () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('index') ); // 统一接口使用,返回后端请求数据
      // console.log(result);
      ctx.body = await ctx.render('index',{
        data: result.query
      });
    };
  }
  // 添加页面
  actionCreate () {
    return async (ctx, next) => {
      ctx.body = await ctx.render('create');
    };
  }
  // 编辑修改页面
  actionUpdate () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('search', ctx.params) );
      ctx.body = await ctx.render('update', result);
    };
  }
  // 查看书详情
  actionView () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('search', ctx.params) );
      ctx.body = await ctx.render('view', result);
    };
  }

  // 添加操作-POST
  actionCreatePost () {
    return async (ctx, next) => {
      let data = ctx.request.body;
      let options = {
        method:'POST',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `book%5Bbook_name%5D=${data.book_name}&book%5Bauthor%5D=${data.author}&book%5Bbook_img%5D=${data.book_img}`,
      };
      const result = await indexMd.postData( YiiApiGet('create'), options);
      ctx.body = result;
    };
  }

  // 编辑修改操作-POST
  actionUpdatePost () {
    return async (ctx, next) => {
      let data = ctx.request.body;
      let options = {
        method:'POST',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `book%5Bbook_name%5D=${data.book_name}&book%5Bauthor%5D=${data.author}&book%5Bbook_img%5D=${data.book_img}`,
      };
      const result = await indexMd.postData( YiiApiGet('update', {id:data.id}), options);
      ctx.body = result;

    };
  }

  // 删除操作
  actionDelete () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('delete', ctx.request.body) );
    };
  }
}

export default indexController;
