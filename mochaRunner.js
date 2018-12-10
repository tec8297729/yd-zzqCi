const Mocha = require('mocha'); // 这是mochaRunner.js文件内容
const mocha = new Mocha({
  // 生成测试报告路径
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/mochawesome-reporter'
  }
});
mocha.addFile('./service/router.spec.js');
mocha.run(function () {
  console.log('done');
  process.exit; //退出进程
})