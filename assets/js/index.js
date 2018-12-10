window.onload = (function () {
  let indexBtn = document.getElementById('country_index');
  indexBtn.addEventListener('click', (e) => {
    let ev = e || event;
    // ev.preventDefault();
    console.log('1')
    let className = (nameStr) => {
      if (typeof nameStr != 'string') throw Error('className(name)-> this in string');
      return ev.target.className.indexOf(nameStr);
    }
    if (className('delete') > 1) {
      ev.preventDefault();
      console.log('del操作')
      fetch("/delete", {
          method: 'POST',
          body: JSON.stringify({ //这里是post请求的请求体
            id: e.target.dataset.id
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
          window.location.reload();
        })
    }
    // 创建数据
    // if (className('create_btn') > 1) {
    //   e.preventDefault();
    //   let bookName = document.getElementById('book_name');
    //   let author = document.getElementById('author');
    //   let bookImg = document.getElementById('book_img');
    //   fetch("/create",{
    //     method:'POST',
    //     body: JSON.stringify({
    //       "book_name": bookName.value,
    //       "author": author.value,
    //       "book_img": bookImg.value
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //   })
    //   .then(res =>  res.json() )
    //   .then(res => console.log(res.code) )
    // }
    // 更新数据
    if (className('update_btn') > 1) {
      e.preventDefault();
      let bookName = document.getElementById('book_name');
      let author = document.getElementById('author');
      let bookImg = document.getElementById('book_img');
      let bookId = getUrlKey("update");
      console.log(bookId);
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
    }
  }, false);

  function getUrlKey(name) {
    var reg = new RegExp(name + "\/([^\/]*)(\\s|\/|$)", "i");
    var result = window.location.href.match(reg);
    return result ? decodeURIComponent(result[1]) : null;
  }
});

