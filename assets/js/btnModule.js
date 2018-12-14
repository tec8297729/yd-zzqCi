class Create{
  constructor(){
    // this.createBtn = $('#create_btn');
  }
  // 创建新书
  createFn () {
    $('#create_btn').on('click',(e) => {
      e.preventDefault();
      let bookName = document.getElementById('book_name');
      let author = document.getElementById('author');
      let bookImg = document.getElementById('book_img');
      console.log(bookName)
      fetch("/create",{
        method:'POST',
        body: JSON.stringify({
          "book_name": bookName.value,
          "author": author.value,
          "book_img": bookImg.value
        }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      })
      .then(res =>  res.json() )
      .then(res => console.log(res.code) )
    });

  }

  updateFn(){
    $('.update_btn').on('click',(e) => {
      e.preventDefault();
      let bookName = document.getElementById('book_name');
      let author = document.getElementById('author');
      let bookImg = document.getElementById('book_img');
      let bookId = getUrlKey("update");
      console.log('操作了更新');
      fetch("/update", {
          method: 'POST',
          body: JSON.stringify({
            "id": bookId,
            "book_name": bookName.value,
            "author": author.value,
            "book_img": bookImg.value
          }),
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        })
        .then(res => res.json())
        .then(res => console.log(res.code))
    });
    function getUrlKey(name){
      var reg = new RegExp(name + "\/([^\/]*)(\\s|\/|$)", "i");
      var result = window.location.href.match(reg);
      return result ? decodeURIComponent(result[1]) : null;
    }
  }

}

export default Create;
