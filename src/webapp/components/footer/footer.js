/**
 * @example <x-footer></x-footer>
 * @description HTML页面直接使用标签,页面顶部头
*/
export default xtag.create('x-footer', class extends XTagElement {
  // 创建按钮，有默认初始值，也可获取标签上属性标签及url
  '::template(true)'() {
    return `
    <footer>
      页脚
    </footer>
    `
  }
});
