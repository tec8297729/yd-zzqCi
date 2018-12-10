(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('koa'), require('koa-static'), require('koa-swig'), require('co'), require('log4js'), require('koa-bodyparser'), require('node-fetch')) :
	typeof define === 'function' && define.amd ? define(['koa', 'koa-static', 'koa-swig', 'co', 'log4js', 'koa-bodyparser', 'node-fetch'], factory) :
	(factory(global.koa,global.statics,global.render,global.co,global.log4js,global.bodyParser,global.nodeFetch));
}(this, (function (koa,statics,render,co,log4js,bodyParser,nodeFetch) { 'use strict';

koa = koa && koa.hasOwnProperty('default') ? koa['default'] : koa;
statics = statics && statics.hasOwnProperty('default') ? statics['default'] : statics;
render = render && render.hasOwnProperty('default') ? render['default'] : render;
co = co && co.hasOwnProperty('default') ? co['default'] : co;
log4js = log4js && log4js.hasOwnProperty('default') ? log4js['default'] : log4js;
bodyParser = bodyParser && bodyParser.hasOwnProperty('default') ? bodyParser['default'] : bodyParser;
nodeFetch = nodeFetch && nodeFetch.hasOwnProperty('default') ? nodeFetch['default'] : nodeFetch;

// initController.js初始化路由，并且加载所有路由
var IndexController = require('./indexController'); //引入首页相关路由控制器
var indexController = new IndexController(); //如果导出没new,就要实例化一次

var Router = require('koa-router'); // 路由中间件
var router = new Router();
// 挂载所有路由
var init = function init(app) {
  // 挂载路由启用
  app.use(router.routes());
  app.use(router.allowedMethods());

  router.get('/', indexController.actionIndex());
  router.get('/create', indexController.actionCreate());
  router.get('/view/:id', indexController.actionView());
  router.get('/update/:id', indexController.actionUpdate());

  router.post('/update', indexController.actionUpdatePost());
  router.post('/create', indexController.actionCreatePost());
  router.post('/delete', indexController.actionDelete());
};

var join = require("path").join; // 路径组件
var _ = require("lodash"); // 模块化JS组件包-函数式编程
var config = {
  "viewDir": join(__dirname, "..", "views"), // 模板文件目录
  "staticDir": join(__dirname, "..", "assets") // 静态资源目录


  // 判断环境变量-开发环境
};if (process.env.NODE_ENV == "development") {
  var localConfig = {
    port: 8888
  };
  config = _.extend(config, localConfig); //合并
}

// 正式上线环境变量
if (process.env.NODE_ENV == "production") {
  var prodConfig = {
    port: 80
  };
  config = _.extend(config, prodConfig);
}

// 上面也可以使用new Map()实现,通过set get方法设置与获取...
// module.exports = config;
var config$1 = config;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 事件错误处理句柄
// const log4js = require('log4js'); // 打印错误日志
// log4js.configure({
//   // 输出源--type:文件(你也可定义xml),filename:输出的文件名
//   appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
//   // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
//   categories: { default: { appenders: ['cheese'], level: 'error',level: 'warn'} }
// });
// const logger = log4js.getLogger('cheese');

var errorHandler = {
  error: function error(app, logger) {
    var _this = this;

    app.use(function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return next();

              case 3:
                _context.next = 12;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);

                logger.error(_context.t0);
                // 下看看公司需求显示页面
                ctx.status = _context.t0.status || 500; // 先读取报错状态,如果没就500
                _context.next = 11;
                return ctx.render('error');

              case 11:
                ctx.body = _context.sent;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 5]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }() // 显示页面
    );
    app.use(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return next();

              case 2:
                if (!(404 != ctx.status)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:
                // 根据实际业务设置状态码,SEO优化权重
                ctx.status = 404; // 可以设置200
                logger.error('err');
                ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="返回主页"></script>';

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

// 以下非koa组件
var app = new koa(); //koa实例

log4js.configure({
  // 输出源--type:文件(你也可定义xml),filename:输出的文件名
  appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
  // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
  categories: { default: _defineProperty({ appenders: ['cheese'], level: 'error' }, 'level', 'warn') }
});
var logger = log4js.getLogger('cheese');
// 配置渲染html相关参数-co插件
app.context.render = co.wrap(render({
  root: config$1.viewDir, // 指定目录，在这下面找index.html
  autoescape: true,
  ext: 'html',
  writeBody: false
}));

app.use(statics(config$1.staticDir)); // 静态文件目录
app.use(bodyParser()); //解析POST数据请求
errorHandler.error(app, logger); // 处理错误打印日志

init(app); // 初始化所有路由(引入app),为后续app.use挂载一些初始化东西使用


// 启用服务
app.listen(config$1.port, function () {
  console.log('\u670D\u52A1\u542F\u52A8\u6210\u529F http://localhost:' + config$1.port);
});

})));
