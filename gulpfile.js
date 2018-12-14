// guLp组件区域
var gulp = require('gulp'),
  uglify = require('gulp-uglify'), // 压缩
  watch = require('gulp-watch'), //监听
  plumber = require('gulp-plumber'), //错误管理 提示
  sourcemaps = require('gulp-sourcemaps'),
  strip = require('gulp-strip-comments'), //删除注释
  rename = require("gulp-rename"), // 文件名重命名
  streamify = require('gulp-streamify'), //只支持 buffer 的插件直接处理 stream
  rollup = require('gulp-rollup'), // 集成的rollup
  babel = require('gulp-babel'), // babel编译
  revCollector = require('gulp-rev-collector'), // 路径替换
  gutil = require('gulp-util'); // 用来打印日志错误

// 以下rollup组件
var rollup = require('rollup'),
    resolve = require('rollup-plugin-node-resolve'), // 插件可以告诉 Rollup 如何查找外部模块
    commonjs = require('rollup-plugin-commonjs'), // 解析node_modules中的模块
    replace = require('rollup-plugin-replace'); // 可在源码中读取环境变量

var release = "./dist/";
var babelOption = {
  presets: ['es2015']
}
var path = {
  src: { // 查找要压缩的文件,'./controllers/*.js'
    app: 'app.js',
    controllers: './controllers/*.js',
    config: './config/*.min.js',
    untils: './untils/*.js',
    models: './models/*.js',
    middleawares: './middleawares/*.js',
    service: './service/*.js',
  },
  dist: { // 压缩处理后存放的目录
    app: release,
    controllers: release + 'controllers/',
    config: release + 'config/',
    untils: release + 'untils/',
    models: release + 'models/',
    middleawares: release + 'middleawares/',
    service: release + 'service/',
  }
};



gulp.task('es5', async () => {
  // 清洗node配置文件
  const bundle = await rollup.rollup({
    input: './config/index.js',
    watch: {
      // include: 'src/**', // 限制文件监控至某些文件
      exclude: 'node_modules/**' // 不监听指定文件
    },
    // rollup插件
    plugins: [
      replace({
        // 设置全局环境变量为 线上环境
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      // rollupBabel({
      //   exclude: 'node_modules/**',
      //   presets: [['es2015', { modules: false }]],
      // }),
      resolve({
        // 将自定义选项传递给解析插件
        // customResolveOptions: {
          //   moduleDirectory: ['./config']
          // }
        }),
      commonjs({ // 转换es5供rollup使用
        include: 'node_modules/**', // 排除文件
      }),

    ],
    // 指出应将哪些模块视为外部模块
    external: [
      'koa', 'koa-static', 'koa-swig', 'co', 'log4js',
      'koa-bodyparser','path','lodash'
    ]
  })
  await bundle.write({
    file: './config/index.min.js',
    // 产出文件使用 umd 规范（即兼容 amd cjs 和 iife）
    format: 'cjs',
    // iife（立即执行函数表达式）规范下的全局变量名称
    // moduleName: 'zzq',
    // 全局模块，不编译
    globals: {
      'lodash': 'lodash',
      'path':'path'
    }
  });


  // 开始处理其它文件编译成es5
  // 处理入口
  await gulp.src(path.src.app)
    .pipe(strip()) //去除注释
    // 编译
    .pipe(streamify(babel(babelOption)))
    .pipe(gulp.dest(path.dist.app));

  // node配置文件-接手rollup的文件
  await gulp.src(path.src.config)
    .pipe(strip()) //去除注释
    // 编译
    .pipe(streamify(babel(babelOption)))
    // .pipe(uglify()) // 压缩
    .pipe(rename('index.js'))// 产出的压缩的文件名，可注释关闭，默认输出原文件名
    .pipe(gulp.dest(path.dist.config));

  // 处理路由文件
  await gulp.src(path.src.controllers)
        .pipe(revCollector())
        // .pipe(watch(path.src.js))
        .pipe(plumber()) // 错误管理提示
        .pipe(sourcemaps.init())
        // .pipe(strip()) //去除注释
        // 编译
        .pipe(streamify(babel(babelOption)))
        // .pipe(uglify()) // 压缩
        // .pipe(rename('app.min.js'))// 产出的压缩的文件名，可注释关闭，默认输出原文件名
        // .pipe(concat('app.all.js')) // 合并文件成all.min.js文件
        .pipe(sourcemaps.write({
          addComment: false
        }))
        .pipe(plumber.stop()) // 错误管理闭关
        .pipe(gulp.dest(path.dist.controllers)); // 输出目录

  // 请求入口公用组件
  await gulp.src(path.src.untils)
        .pipe(strip()) //去除注释
        // 编译
        .pipe(streamify(babel(babelOption)))
        .pipe(gulp.dest(path.dist.untils));

  // models目录
  await gulp.src(path.src.models)
        .pipe(strip()) //去除注释
        // 编译
        .pipe(streamify(babel(babelOption)))
        .pipe(gulp.dest(path.dist.models));

  // middleawares目录
  await gulp.src(path.src.middleawares)
        .pipe(strip()) //去除注释
        // 编译
        .pipe(streamify(babel(babelOption)))
        .pipe(gulp.dest(path.dist.middleawares));

  // service单测目录
  await gulp.src(path.src.service)
        .pipe(strip()) //去除注释
        // 编译
        .pipe(streamify(babel(babelOption)))
        .pipe(gulp.dest(path.dist.service));
});


// 默认任务配置
gulp.task('default', () => {
  gulp.run('es5'); // 启动指定任务名

  // 监听 js 原始文件的变化，有变化启用指定任务
  gulp.watch(path.src.js, () => {
    gulp.run('es5');
  })
});
