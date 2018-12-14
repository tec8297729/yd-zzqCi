测试
YII文件没动，不在复制一份过来
x-tag写入页面中
webpack编译前端JS文件（app/js内）
travis对接完成，没写shell脚本
gulp编译后文件在dist目录内

注意事项： 因为还是测试阶段，npm run dev2跑服务
1、编译后的文件在dist目录内，还没移动出来，要移动出来到根目录才能启服务（有些文件没全移动进去）
2、启动会报regeneratorRuntime is not defined 在解决中
3、是否把目前前端所有目录移动到APP目录中，还有考虑当中，引入文件路径还要解决（与第一个问题有联系）

app1.js是原始文件，是免改动后废了不能还原
[![Build Status](https://travis-ci.com/tec8297729/yd-zzqCi.svg?branch=master)](https://travis-ci.com/tec8297729/yd-zzqCi)
