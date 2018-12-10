var gulp = require('gulp'),
  uglify = require('gulp-uglify'), // 压缩
  concat = require('gulp-concat'), // 合并
  watch = require('gulp-watch'), //监听
  plumber = require('gulp-plumber'), //错误管理 提示
  sourcemaps = require('gulp-sourcemaps'),
  strip = require('gulp-strip-comments'), //删除注释
  rename = require("gulp-rename"), // 文件名重命名
  streamify = require('gulp-streamify'), //只支持 buffer 的插件直接处理 stream
  babel = require('gulp-babel'), // babel编译
  gutil = require('gulp-util'); // 用来打印日志错误

// var rollup = require('gulp-rollup');

var rollup = require('rollup');
var resolve = require('rollup-plugin-node-resolve'); //插件可以告诉 Rollup 如何查找外部模块
var commonjs = require('rollup-plugin-commonjs'); //打包 commonjs模块
var rollupBabel = require('rollup-plugin-babel');


var path = {
  src: { // 查找要压缩的文件
    js: ['app.all.js','./controllers/*.js']
  },
  dist: { // 压缩处理后存放的目录
    js: "release/"
  }
};

gulp.task('6to5', () => {
  return rollup.rollup({
      input: './app.js',
      watch: {
        exclude: 'node_modules/**'
      },
      plugins: [
        rollupBabel({
          exclude: 'node_modules/**'
        }),
        commonjs({ // 转换es5供rollup使用
          include: 'node_modules/**', // 排除文件
          // exclude: [ 'node_modules/foo/**', 'node_modules/koa-static/**' ],
        }),
        resolve({
          // 将自定义选项传递给解析插件
          customResolveOptions: {
            moduleDirectory: ['./config']
          }
        }),
      ],
      // 指出应将哪些模块视为外部模块
      external: [
        './controllers/','./middleawares/',
        'koa', 'koa-static', 'koa-swig', 'co', 'log4js',
        'koa-bodyparser', 'node-fetch'
      ]
    })
    .then((bundle) => {
      bundle.write({
        file: './app.all.js',
        // 产出文件使用 umd 规范（即兼容 amd cjs 和 iife）
        format: 'umd',
        // iife规范下的全局变量名称
        moduleName: 'zzq',
      });
    })
    .then(()=>{
      gulp.src(path.src.js)
        .pipe(watch(path.src.js))
        .pipe(plumber()) // 错误管理提示
        .pipe(sourcemaps.init())
        .pipe(strip()) //去除注释
        // 编译
        /* .pipe(streamify(babel(
          {
            "presets": ["es2015", "stage-0"]
          }
        )))
        .pipe(uglify()) // 压缩 */
        // .pipe(rename('app.min.js'))// 产出的压缩的文件名，可注释关闭，默认输出原文件名
        .pipe(sourcemaps.write({
          addComment: false
        }))
        .pipe(plumber.stop()) // 错误管理闭关
        .pipe(gulp.dest(path.dist.js)); // 输出到到build目录内
    })

});



// 默认任务配置
gulp.task('default', () => {
  gulp.run('6to5'); // 启动指定任务名

  // 监听 js 原始文件的变化，有变化启用指定任务
  gulp.watch(path.src.js, () => {
    gulp.run('6to5');
  })
});
