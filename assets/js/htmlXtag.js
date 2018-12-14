
/**
 * 提交新书表单模块
 * @example <x-createform></x-createform>
 * @description 集成了提交按钮在内，直接调用标签，JS提交事件未集成在内
*/
xtag.create('x-createform', class extends XTagElement {
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


/**
 * 提交按钮
 * @example <x-createbtn title="" class="" id=""></x-createbtn>
 * @description 可单独使用，可嵌套使用，未集成JS绑定事件
*/
xtag.create('x-createbtn', class extends XTagElement {
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
    // return {
    //   title : this.title || '按钮',
    //   btnClass : this.class || 'create_btn',
    //   btnId : this.id || ''
    // }
  }
  // 监听获取标签元素参考
  get 'title::attr' (){}
  get 'class::attr' (){}
  get 'id::attr' (){}
  // 提交事件
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

/**
 * @example <x-bigbtn title="入库新书" url='/32424/'></x-bigbtn>
 * @description HTML页面直接使用标签，定义title和url链接，可不写
*/
xtag.create('x-bigbtn', class extends XTagElement {
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


/**
 * @example <x-nav></x-nav>
 * @description HTML页面直接使用标签,页面顶部头
*/
xtag.create('x-nav', class extends XTagElement {
  // 创建按钮，有默认初始值，也可获取标签上属性标签及url
  '::template(true)'() {
    return `
    <nav id="w1" class="navbar-inverse navbar-fixed-top navbar">
      <div class="container">
        <div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#w1-collapse"><span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span></button><a class="navbar-brand" href="/">My Application</a></div>
        <div id="w1-collapse" class="collapse navbar-collapse">
          <ul id="w2" class="navbar-nav navbar-right nav">
            <li><a href="/">首页</a></li>
            <li><a href="/yii/web/index.php?r=site%2Fabout">About</a></li>
            <li><a href="/yii/web/index.php?r=site%2Fcontact">Contact</a></li>
            <li><a href="/yii/web/index.php?r=site%2Flogin">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
    `
  }
});

/**
 * @example <x-breadcrumb title="导航标题"></x-breadcrumb>
 * @description HTML页面直接使用标签，导航
*/
xtag.create('x-breadcrumb', class extends XTagElement {
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
