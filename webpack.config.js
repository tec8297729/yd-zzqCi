const join = require('path').join; // nodejs基本包，处理路径的
// const isDev = process.env.NODE_ENV === 'development'// 判断环境，默认使用开发环境
const webpack = require('webpack'); // 调用webpack

const config = {
  //配置入口资源，分析入口文件里面所有引用包，编译都是从这找
  entry: join(__dirname, 'app/js/btn.js'),
  output: {
    filename: 'js/btn.min.js',
    path: join(__dirname, 'assets') // 输出目录
  },
  //资源处理，帮我们编译CSS、LASS等加载器
  module: {
    rules: [{
      test: /\.js$/, // 值一个正则，符合这些正则的资源会用一个loade来处理
      use: {
        loader: 'babel-loader', // 缓存loader执行结果 发现打包速度已经明显提升
        options: { // 指定参数哪些语法编译
          presets: [
            ['es2015']
          ]
        }
      },
      exclude: '/node_module/' // 排除在外
    },
  ]

  }
}

module.exports = config;
