const path = require('path'); // nodejs基本包，处理路径的
const webpack = require('webpack'); // 调用webpack
const HTMLPlugin = require('html-webpack-plugin')// 引入编译html模板插件
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')// 引入分离打包CSS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //
// 获取html-webpack-plugin参数的方法
const getHtmlConfig = function(options){
  return {
    template : __dirname+'/src/webapp/views/'+ options.name +'.html',//原始文件路径
    filename : __dirname+'/dist/views/'+ options.name +'.html',//生成文件的路径
    inject : true, //设置为head, 把js引入放在head标签里面
    // chunks : options.chunks || '', //需要引入的JS模块文件
    minify:{    //压缩HTML文件
      removeComments:true, //移除HTML中的注释
      collapseWhitespace:false //删除空白符与换行符
    }
  };
};

const config = {
  target: 'node',
  mode: 'production', // 设置默认环境development，命令直接--mode production
  //配置入口资源，分析入口文件里面所有引用包，编译都是从这找
  entry: path.join(__dirname, '/src/webapp/index.js'),
  output: {
    filename: 'assets/js/[name].js', // 生成文件名[name].[chunkhash]
    path: __dirname + '/dist/'// 输出目录
  },
  //资源处理，帮我们编译CSS、LASS等加载器
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],    // or whatever
          plugins: [require('babel-plugin-transform-class-properties')], // or whatever
          compact: false    // or false during development
        },
        exclude: /node_modules/, // 处理除了nodde_modules里的js文件
      },
      /* 解析css,并不生成CSS */
      { test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // minimize: process.env.NODE_ENV === 'production',
          //   }
          // },
          'css-loader',
        ]
      },
    ]
  },
  // 自定义外部插件
  plugins:[
    // 这个插件会在 webpack 中实现以上的预编译功能,把相同的代码合并
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HTMLPlugin(getHtmlConfig({
      name:'index'
    })),
    new HTMLPlugin(getHtmlConfig({
      name:'layout'
    })),
    new HTMLPlugin(getHtmlConfig({
      name:'create'
    })),
    new HTMLPlugin(getHtmlConfig({
      name:'error'
    })),
    new HTMLPlugin(getHtmlConfig({
      name:'update'
    })),
    new HTMLPlugin(getHtmlConfig({
      name:'view'
    })),
    // new MiniCssExtractPlugin({
    //   filename: '../css/site.css'
    // }), // 输出CSS文件
  ],
  resolve: {
    // 资源另名处理
    alias: {
      // 给目录创建别名,以后在使用直接写'util/文件名.js'，而不用繁锁的../..写路径了
      '@': path.join(__dirname), // 根目录
      '../assets': path.join(__dirname, '../assets'), // 根目录
    },
  },
}


module.exports = config;
