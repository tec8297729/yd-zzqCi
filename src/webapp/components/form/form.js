
/**
 * 提交新书表单模块
 * @example <x-createform></x-createform>
 * @description 集成了提交按钮在内，直接调用标签，JS提交事件未集成在内
*/
export default xtag.create('x-createform', class extends XTagElement {
  // 这里定义需要渲染的内容。template只有接受true才会渲染
  '::template(true)'() {
    return `
    <div class="country-form">
      <form id="w0 country_form" name="country_form" action="/" method="post">
        <div class="form-group field-book_name required">
          <label class="control-label" for="book_name">书籍名称</label>
          <input type="text" id="book_name" class="form-control el-input" name="book_name" maxlength="52" aria-required="true">
          <div class="help-block"></div>
        </div>
        <div class="form-group field-author">
          <label class="control-label" for="author">作者</label>
          <input type="text" id="author" class="form-control el-input" name="author">

          <div class="help-block"></div>
        </div>
        <div class="form-group field-book_img">
          <label class="control-label" for="book_img">图片</label>
          <input type="text" id="book_img" class="form-control el-input" name="book_img">

          <div class="help-block"></div>
        </div>
        <div class="form-group">
          <x-createbtn title="创建" class="create_btn" id="create_btn"></x-createbtn>
        </div>
      </form>
    </div>
    `
  }
});
