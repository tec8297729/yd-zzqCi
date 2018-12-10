import resolve from 'rollup-plugin-node-resolve'; //插件可以告诉 Rollup 如何查找外部模块
import commonjs from 'rollup-plugin-commonjs'; //打包 commonjs模块
import babel from 'rollup-plugin-babel'; // 使用babel
import json from 'rollup-plugin-json';

export default {
  input: './app.js',
  // sourceMap: true, // 生成map查找问题
  output: {
    file: './app.all.js', // 输出文件
    // 产出文件使用 umd 规范（即兼容 amd cjs 和 iife）
    format: 'es'
  },
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
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
    json()
  ],
  // 指出应将哪些模块视为外部模块
  external: ['./controllers/initController','./middleawares/errorHandler']
};
