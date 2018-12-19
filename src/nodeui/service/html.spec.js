const Rize = require('rize');
const rize = new Rize(); //可以设置一些参数

const host = 'http://localhost:88/';

describe("html页面测试", function(){
  it('index－>create',()=>{
    rize
      .goto(`${host}`) // 输入网址跳转
      .assertTitle('z图书管理系统') // 断言标题
      .assertSee('书籍名称') // 断言是否有指定内容
      .end();
    })
    // .assertClassHas('delete', 'btn btn-success') // 检测某个元素是否包含指定class
    // .assertTitle('z图书管理系统232') // 判断当前断言标题
    // .closePage('index') // 关闭单页
    // .end() // 关闭浏览器
    // .click('glyphicon-eye-open') // 点击这个元素
    // .assertUrlMatch(/^http?/) // 检查URL是否匹配正则
    // .type('input.header-search-input', 'node') //找到指定input标签的class名,输入node
    // .press('Enter') // 按回车键
    // .waitForNavigation() // 等待跳转,因为是搜索会跳到结果页面
    // .assertSee('书籍名称') // 检查网页是否有指定内容

})
