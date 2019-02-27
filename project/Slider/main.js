window.onload = function () {

  var dota2 = document.getElementById("dota2");
  var imgs = dota2.getElementsByTagName("img");
  var lis = dota2.getElementsByTagName("li");
  var timer = null;
  var cur = 0;
  var len = lis.length;

  // 定义并调用 自动播放函数
  timer = setInterval(autoPlay, 4000);

  // 当鼠标滑过图片暂停播放
  dota2.onmouseenter = function () {
    clearInterval(timer);
  }

  // 当鼠标离开图片继续播放
  dota2.onmouseleave = function () {
    timer = setInterval(autoPlay, 4000);
  }

  // 遍历所有圆点导航实现划过切换至对应图片
  for (var i = 0; i < len; i++) {
    (function (j) {
      lis[j].onclick = function () {
        changePic(j);
        cur = j;
      }
    }(i))
  }

  // 自动播放函数
  function autoPlay() {
    cur++;
    if (cur >= len) {
      cur = 0;
    }
    changePic(cur);
  }

  // 切换图片函数
  function changePic(curIndex) {
    for (var i = 0; i < len; i++) {
      imgs[i].className = "unshow";
      lis[i].className = "";
    }
    imgs[curIndex].className = "show";
    lis[curIndex].className = "active";
  }
}