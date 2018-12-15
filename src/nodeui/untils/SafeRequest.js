// 接口统一调用此方法为入口,封装fetch,为了更好的容错处理
// const fetch = require('node-fetch'); // 请求接口组件
import fetch from 'node-fetch'; // 请求接口组件

class SafeRequest {
  constructor (url,options){
    this.url = url;
    this.options = options;
  }
  // 统一使用此接口,进行容错处理
  fetchUntil (){
    // 返回一个异步对象
    return new Promise((resolve,reject)=>{
      let result = {code:0, message:''}; // 返回请求结果初始化
      fetch(this.url, this.options)
      .then((res)=>{
        try {
          result = res.json(); // 尝试可以走通就返回json数据
          return result; // 正常接收返回给下一层.then使用
        } catch (error) {
          result.code = 1;
          result.message = '解析JSON失败';
          reject(error);
        }
      })
      .then((body)=>{
        // if(body.code == 200){ // 还可以在判断后端数据状态
          resolve(body); //返回请求后的数据体
        // }
      })
      .catch((error)=>{
        result.code = 2;
        result.message = 'node-fetch请求失败,后端报警-请求挂了';
        // 中间可以处理 自动发送email,或打电话短信等
        reject(result); // 返回一个错误,以免用户感知
      })

    })
  }
}

// module.exports = SafeRequest;
export default SafeRequest
