/**
 * @example <x-nav></x-nav>
 * @description HTML页面直接使用标签,页面顶部头
*/
export default xtag.create('x-nav', class extends XTagElement {
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
