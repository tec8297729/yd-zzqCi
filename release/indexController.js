const indexMd = require('../models/indexMd'); 
const url = require('url').URLSearchParams;

function YiiApiGet(str, obj) {
  let host = 'http://localhost/yii/web/index.php?r=book/';
  let apiRouter = {
    index: `${host}indexjson`, 
    search: `${host}viewjson`, 
    delete: `${host}deletejson`, 
    create: `${host}createjson`, 
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



class indexController {
  constructor(){}
  actionIndex () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('index') ); 
      ctx.body = await ctx.render('index',{
        data: result.query
      });
    };
  }
  actionCreate () {
    return async (ctx, next) => {
      ctx.body = await ctx.render('create');
    };
  }
  actionUpdate () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('search', ctx.params) );
      ctx.body = await ctx.render('update', result);
    };
  }
  actionView () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('search', ctx.params) );
      ctx.body = await ctx.render('view', result);
    };
  }

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

  actionDelete () {
    return async (ctx, next) => {
      const result = await indexMd.getData( YiiApiGet('delete', ctx.request.body) );
    };
  }
}

export default indexController;
