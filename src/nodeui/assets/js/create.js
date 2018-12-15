class Create{
  constructor(){
    this.createBtn = $('#create_btn');
  }
  // 创建新书
  createFn () {
    $(this.createBtn).on('click',postData);

    function postData(e) {
      console.log(e)
      e.preventDefault();
      let bookName = document.getElementById('book_name');
      let author = document.getElementById('author');
      let bookImg = document.getElementById('book_img');
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
    }
  }
}

export default Create;
