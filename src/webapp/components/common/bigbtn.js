/**
 * @example <x-bigbtn title="入库新书" url='/32424/'></x-bigbtn>
 * @description HTML页面直接使用标签，定义title和url链接，可不写
*/
let bigbtn = xtag.create('x-bigbtn', class extends XTagElement {
  // 创建按钮，有默认初始值，也可获取标签上属性标签及url
  '::template(true)'() {
    return `
      <p>
        <a href="${this.info().url}" class="btn btn-success">${this.info().title}</a>
      </p>
    `
  }
  // 初始值
  info() {
    return {
      title: this.title || '入库新书',
      url: this.url || '/create/'
    };
  }
  // 监听获取标签元素参考
  get 'title::attr' (){}
  get 'url::attr' (){}
});

export default new bigbtn()
