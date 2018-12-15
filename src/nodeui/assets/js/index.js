window.onload = (function () {
  let indexBtn = document.getElementById('country_index');
  if(indexBtn){
    indexBtn.addEventListener('click', (e) => {
      let ev = e || event;
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
    }, false);
  }

});

