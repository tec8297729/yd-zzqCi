
/**
 * 提交按钮
 * @example <x-createbtn title="" class="" id=""></x-createbtn>
 * @description 可单独使用，可嵌套使用，未集成JS绑定事件
*/
export default xtag.create('x-createbtn', class extends XTagElement {
  // 生成完元素后运行的函数
  connectedCallback () {
    this.render('bar')
    // this.createFn();
  }
  // 这里定义需要渲染的内容。template只有接受true才会渲染
  'bar::template'() {
    return this.info();
  }
  // 初始值
  info() {
    let title = this.title || '按钮';
    let btnClass = this.class || '';
    let btnId = this.id || '';
    if(!btnId){
      return `
      <button type="submit" class="btn btn-success ${btnClass}">${title}
      </button>
      `;
    }else{
      return `
      <button type="submit" class="btn btn-success ${btnClass}" id="${btnId}">${title}
      </button>
      `;
    }
  }
  // 监听获取标签元素参考
  get 'title::attr' (){}
  get 'class::attr' (){}
  get 'id::attr' (){}
  // 提交事件,备用
  // createFn () {
  //   $('#create_btn').on('click',postData);
  //   function postData(e) {
  //     e.preventDefault();
  //     let bookName = document.getElementById('book_name');
  //     let author = document.getElementById('author');
  //     let bookImg = document.getElementById('book_img');
  //     fetch("/create",{
  //       method:'POST',
  //       body: JSON.stringify({
  //         "book_name": bookName.value,
  //         "author": author.value,
  //         "book_img": bookImg.value
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8'
  //       },
  //     })
  //     .then(res =>  res.json() )
  //     .then(res => {
  //       console.log(res);
  //     })
  //   }
  // }
});

