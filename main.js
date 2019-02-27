$(function(){
  $(".li").hover(function(){
    $(this).find(".co").stop().animate({'height':'300px'},300);
  }, function(){
    $(this).find(".co").stop().animate({'height':'0px'},300);
  })
})