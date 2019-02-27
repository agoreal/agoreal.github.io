(function (window) {
  function Lyric(path) {
    return new Lyric.prototype.init(path);
  }
  Lyric.prototype = {
    constructor: Player,
    init: function (path) {
      this.path = path;
    },
    times:[],
    lyrics: [],
    index: -1,
    loadLyric: function(callback) {
      var $this = this;
      $.ajax({
        url: $this.path,
        dataType: "text",
        success: function (data) {
          $this.parseLyric(data);
          callback();
        },
        error: function (e) {
  
        }
      })
    },
    parseLyric: function(data) {
      var $this = this;
      // 清楚歌词和时间
      $this.times = [];
      $this.lyrics = [];
      var array = data.split('\n');
      var timeReg = /\[(\d*:\d*\.\d*)\]/
      // 遍历取出每一行歌词
      $.each(array, function(index, ele){
        // 处理歌词
        var lrc = ele.split(']')[1];
        //排除空歌词
        if(lrc.length == 1) return true;
        $this.lyrics.push(lrc);

        var res = timeReg.exec(ele);
        if(res == null) return true;
        var timeStr = res[1];
        var res2 = timeStr.split(':');
        var min = parseInt(res2[0]) * 60;
        var sec = parseFloat(res2[1]);
        var time = parseFloat(Number(min + sec).toFixed(2));
        $this.times.push(time);       
      })
    },
    currentIndex: function(currentTime) {
      if(currentTime >= this.times[0]) {
        this.index++;
        this.times.shift();
      }
      return this.index;
    }
  };
  Lyric.prototype.init.prototype = Lyric.prototype;
  window.Lyric = Lyric;
})(window);