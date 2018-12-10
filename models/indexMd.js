const SafeRequest = require('../untils/SafeRequest'); //统一接口请求

/**
 * Index类 获取后台有关图书相关数据类
 * @class
 */
class Index{
  /**
   * 获取后台的全部数据，通用get接口
   * @description 描述内容
   * @param {string} url 接口API
   * @param {object} options fetch相关配置项
   * @example getData( url, {headers:'**'} )
   */
  getData(url,options){
    const safeRequest = new SafeRequest(url,options);
    return safeRequest.fetchUntil(); // 返回请求的数据出来
  }

  /**
   * 创建新增数据，post接口
   * @param {string} url 接口API
   * @param {object} options fetch相关配置项
   * @example getData( url, {method:'POST',} )
   */
  postData(url,options){
    const safeRequest = new SafeRequest(url,options);
    return safeRequest.fetchUntil(); // 返回请求的数据出来
  }

}

module.exports = new Index();
