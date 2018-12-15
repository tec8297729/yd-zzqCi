/**
 * @example <x-breadcrumb title="导航标题"></x-breadcrumb>
 * @description HTML页面直接使用标签，导航
*/
let breadcrumb = xtag.create('x-breadcrumb', class extends XTagElement {
  // 创建按钮，有默认初始值，也可获取标签上属性标签及url
  '::template(true)'() {
    return `
    <ul class="breadcrumb">
      <li><a href="/">首页</a></li>
      ${this.info()}
    </ul>
    `
  }
  // 初始值
  info() {
    let title = this.title;
    if(!title) return ""; // 没有参数返回空
    return `<li class="active">${title}</li>`
  }
  // 监听获取标签元素参考
  get 'title::attr' (){}
});
export default new breadcrumb()
