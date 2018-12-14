import resolve from 'rollup-plugin-node-resolve'; //插件可以告诉 Rollup 如何查找外部模块
import commonjs from 'rollup-plugin-commonjs'; //打包 commonjs模块
import babel from 'rollup-plugin-babel'; // 使用babel
var replace = require('rollup-plugin-replace'); // 可在源码中读取环境变量
export default {
  // input: './app.js',
  input: './config/index.js',
  // sourceMap: true, // 生成map查找问题
  output: {
    file: './app.all.js', // 输出文件
    // 产出文件使用 umd 规范（即兼容 amd cjs 和 iife）
    format: 'umd',
    // sourcemap:true, //生成bundle.map.js文件，方便调试
    // 全局指定哪些模块是外部依赖不编译
    // globals: {
    //   config: 'config'
    // }
  },
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      // 设置全局环境变量为 线上环境
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs({ // 转换es5供rollup使用
      include: 'node_modules/**',  // 排除文件
      // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
    }),
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: './config'
      }
    }),
  ],
  // 指出应将哪些模块视为外部模块,不打包
  external: ['./controllers/initController','./middleawares/errorHandler']
};
