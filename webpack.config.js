const path = require('path'); // nodejs基本包，处理路径的
// const isDev = process.env.NODE_ENV === 'development'// 判断环境，默认使用开发环境
const webpack = require('webpack'); // 调用webpack

const config = {
  target: 'node', // node环境，不解析node语法
  //配置入口资源，分析入口文件里面所有引用包，编译都是从这找
  entry: path.join(__dirname, 'dist/app.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname) // 输出目录
  },
  //资源处理，帮我们编译CSS、LASS等加载器
  module: {
    rules: [{
      test: /\.(js)$/,
      loader: 'babel-loader',
      // options: {
      //   presets: ['es2015'],    // or whatever
      //   plugins: [require('babel-plugin-transform-class-properties')], // or whatever
      //   compact: false    // or false during development
      // },
      exclude: /node_modules/, // 处理除了nodde_modules里的js文件
    },
    ]
  },
  plugins:[
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    // 资源另名处理
    alias: {
      // 给目录创建别名,以后在使用直接写'util/文件名.js'，而不用繁锁的../..写路径了
      'node_modules': path.join(__dirname, 'node_modules'), // 指定npm插件目录
      '@': path.join(__dirname), // 根目录
      'assets': path.join(__dirname, 'assets'), // 静态资源目录
      'views': path.join(__dirname, 'views'), // web模板目录
      'controllers': path.join(__dirname, 'controllers'), // 路由目录
      'models': path.join(__dirname, 'models'), // models目录
      'untils': path.join(__dirname, 'untils'), // untils目录
      'middleawares': path.join(__dirname, 'middleawares'), // http容错目录
    },
    // 当你reuire时，不需要加上以下扩展名
    extensions: ['.js', '.md', '.vue', 'json']
  },
}

module.exports = config;
