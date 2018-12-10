let request = require('supertest'); 
request = request('http://localhost/yii/web/index.php?r=book/'); // 请求服务器
let data = {
  book_name: '测试书籍',
  author: '左右',
  book_img: 'http://www.baiddu.com/1.jpg'
};
let deleteId = 48;
describe('YII后台接口', function(){
  it('index 接口-所有数据', function(done){
    request.get('index')
    .expect(200,done)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('createjson 接口-创建操作', function(done){
    //请求页面地址
    request.post('createjson')
      .send(`book%5Bbook_name%5D=${data.book_name}&book%5Bauthor%5D=${data.author}&book%5Bbook_img%5D=${data.book_img}`) //发送数据,可以是对象方式
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
      .set('Content-Type', 'application/x-www-form-urlencoded') // 设置请求报头
      // .expect('Content-Type', /json/) // 判断响应头字段
      .expect(200, done) // 断言判断如果返回状态码是200 
      .end(function(err, res) { // 结束测试用例
        if (err) return done(err); //如果有错误返回错误,否则正常done
        done();
      });
  });

  it('updatejson 接口-更新操作', function(done){
    let newData = {
      book_name: '测试书籍'+Math.floor(Math.random()*10),
      author: '左右2',
      book_img: 'http://www.baiddu.com/2.jpg'
    };
    //请求页面地址
    request.post('updatejson&id=11')
      .send(`book%5Bbook_name%5D=${newData.book_name}&book%5Bauthor%5D=${newData.author}&book%5Bbook_img%5D=${newData.book_img}`) //发送数据,可以是对象方式
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
      .set('Content-Type', 'application/x-www-form-urlencoded') // 设置请求报头
      // .expect('Content-Type', /json/) // 判断响应头字段
      .expect(200,done) // 断言判断如果返回状态码是200 
      .end(function(err, res) { // 结束测试用例
        if (err) return done(err); //如果有错误返回错误,否则正常done
        done();
      });
  });
  
  it('view 接口-查看单个数据', function(done){
    request.get('viewjson&id=11')
    .set('Content-Type', 'application/json; charset=UTF-8') // 判断响应头字段
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
  it('delete 接口-删除数据', function(done){
    request.get(`deletejson&id=${deleteId}`)
    .set('Content-Type', 'application/json; charset=UTF-8') // 判断响应头字段
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      deleteId += deleteId;
      done();
    });
  });
})