let slide = {
  playing: {
    ul: 'playing_ul',
    pre: '.pre-btn',
    next: '.next-btn',
    page: '#page'
  },
  hot: {
    ul: 'hot-ul',
    pre: '.pre',
    next: '.next',
    page: '.cur-page'
  }
}

let hotSlide = {
  movie: {
    wrap: "slide-wp",
    pre: ".M-pre",
    next: ".M-next",
    lis: "M-dot",
  },
  TV: {
    wrap: "TV-slide-wp",
    pre: ".TV-pre",
    next: ".TV-next",
    lis: "TV-dot",
  }
}

slidePlay(10000, slide.playing);
slide2(hotSlide.movie);
slide2(hotSlide.TV);
slidePlay(5000, slide.hot);

function slidePlay(time, obj) {
  let play = document.getElementById(obj.ul);
  let preBtn = document.querySelector(obj.pre);
  let nextBtn = document.querySelector(obj.next);
  let page = document.querySelector(obj.page);
  let timer = null;
  let cur = 0;

  // 获取按钮，实现翻页
  preBtn.onclick = function () {
    if (page.innerHTML <= 1) {
      page.innerHTML = 7;
      play.style.marginLeft = -3500 + 'px';
      cur = -3500;
    } else {
      play.style.marginLeft = cur + 700 + 'px';
      cur += 700;
    }
    page.innerHTML--;
  }

  nextBtn.onclick = function () {
    if (page.innerHTML >= 6) {
      page.innerHTML = 0;
      play.style.marginLeft = 0 + 'px';
      cur = 0;
    } else {
      play.style.marginLeft = cur + -700 + "px";
      cur += -700;
    }
    page.innerHTML++;
  }

  // 定时器，自动翻页
  timer = setInterval(autoPlay, time);

  function autoPlay() {
    cur += -700;
    if (cur < -3600) {
      cur = 0
    }
    play.style.marginLeft = cur + "px";
    page.innerHTML++;
    if (page.innerHTML > 6) {
      page.innerHTML = 1
    }
  }
}

function slide2(obj) {
  let play = document.getElementById(obj.wrap); 
  let preBtn = document.querySelector(obj.pre);
  let nextBtn = document.querySelector(obj.next);
  let lis = document.getElementsByClassName(obj.lis);
  let len = lis.length;
  let cur = 0;
  let index = 0;
  console.log(lis[0]);

  for(var i = 0; i < len; i++) {
    (function(j) {
      lis[j].onclick = function() {
        changeLi(j);
      }
    }(i));
  }

  preBtn.onclick = function() {
    play.style.marginLeft = cur + 700 + 'px';
    cur += 700;
    for (var i = 0; i < len; i++) {
      lis[i].ClassName = "dot";
      lis[i].id = "";
    }
    index--;
    if(index < 0) {
      index = 4;
      play.style.marginLeft = -2800 + 'px';
      cur = -2800;
    }
    lis[index].id = "active";
    console.log('pre:' + cur);
  }

  nextBtn.onclick = function() {
    play.style.marginLeft = cur + -700 + 'px';
    cur += -700;
    for (var i = 0; i < len; i++) {
      lis[i].ClassName = "dot";
      lis[i].id = "";
    }
    index++;
    if(index > 4) {
      index = 0;
      play.style.marginLeft = 0 + 'px';
      cur = 0;
    }
    lis[index].id = "active";
    console.log('next:' + cur);
  }
  
  function changeLi(curIndex) {
    for (var i = 0; i < len; i++) {
      lis[i].id = "";
    }
    lis[curIndex].id = "active";
    cur = curIndex * -700;
    index = curIndex;
    play.style.marginLeft = cur + 'px';
    console.log('click:' + cur);
  }
}