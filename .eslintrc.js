// https://cn.eslint.org/docs/rules/  配置规则参数中文说明
module.exports = {
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错，默认eslint:recommended
  "extends": "standard",
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  "root": true,
  //此项指定环境的全局变量，下面的配置指定为浏览器环境
  "env": {
    "browser": true,
    "es6": true
  },
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  "parser": "babel-eslint",
  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的,添加了不会识别vue
  "plugins": [
    "html",
    "standard",
    // "promise"
  ],
  // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
  // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
  // "off" -> 0 关闭规则
  // "warn" -> 1 开启警告规则
  //"error" -> 2 开启错误规则
  // 了解了上面这些，下面这些代码相信也看的明白了
  "rules": {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // 箭头函数用小括号括起来
    'arrow-parens': 0,
    // 生成器函数*的前后空格
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 不检测未尾是否有空行
    'eol-last': 0,
    // 不检测 在function{}左括号前是否要加一个空格
    'space-before-function-paren' : 0,
    // 换行2个空格
    "indent": ["error",2],
    "semi": [2, "always"],//语句强制分号结尾
    // 换行风格
    // "linebreak-style": [
    //   "error",
    //   "windows"
    // ],
    //字符串必须使用单引号
    // "quotes": [
    //     "error",
    //     "single"
    // ],
    //require the use of === and !==
    "eqeqeq" : 0,
    "one-var": 0,
  }
};
