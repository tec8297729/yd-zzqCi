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

var IndexController = require('./indexController'); 
var indexController = new IndexController(); 

var Router = require('koa-router'); 
var router = new Router();
var init = function init(app) {
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

var join = require("path").join; 
var _ = require("lodash"); 
var config = {
  "viewDir": join(__dirname, "..", "views"), 
  "staticDir": join(__dirname, "..", "assets") 


};if (process.env.NODE_ENV == "development") {
  var localConfig = {
    port: 8888
  };
  config = _.extend(config, localConfig); 
}

if (process.env.NODE_ENV == "production") {
  var prodConfig = {
    port: 80
  };
  config = _.extend(config, prodConfig);
}

var config$1 = config;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


var errorHandler = {
  error: function error(app, logger) {
    var _this = this;

    app.use(function () {
      var _ref = _asyncToGenerator( regeneratorRuntime.mark(function _callee(ctx, next) {
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
                ctx.status = _context.t0.status || 500; 
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
    }() 
    );
    app.use(function () {
      var _ref2 = _asyncToGenerator( regeneratorRuntime.mark(function _callee2(ctx, next) {
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
                ctx.status = 404; 
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


var app = new koa(); 

log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
  categories: { default: _defineProperty({ appenders: ['cheese'], level: 'error' }, 'level', 'warn') }
});
var logger = log4js.getLogger('cheese');
app.context.render = co.wrap(render({
  root: config$1.viewDir, 
  autoescape: true,
  ext: 'html',
  writeBody: false
}));

app.use(statics(config$1.staticDir)); 
app.use(bodyParser()); 
errorHandler.error(app, logger); 

init(app); 


app.listen(config$1.port, function () {
  console.log('\u670D\u52A1\u542F\u52A8\u6210\u529F http://localhost:' + config$1.port);
});

})));
