/**
* Created by admin on 2016/7/13.
*/

$(function(){
  var audio = document.getElementById('audio');
  var isPlaying = false;

  var $leftRange = $('.progressbar_range'),
    $timeline = $('.progressbar_slide'),
    $slideBar = $('.slide-bar');
  var totalLen = parseInt($timeline.width()); //时间轴总长度

  // 播放位置发生改变时，改变左侧长度
  audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime,
      duration = audio.duration;
    var progresslen = (currentTime + .25) / duration * 100 * totalLen;
    $leftRange.stop(true, true).animate({'width': (currentTime + .25) / duration * 100 + '%'}, 250, 'linear');

    if (audio.ended) {
      $("#play_btn").show();
      $("#pause_btn").hide();
    }
  });
  //改变数值显示
  audio.addEventListener("timeupdate", function() {
    var timeleft = document.getElementById('timeleft'),
      duration = parseInt( audio.duration ),
      currentTime = parseInt( audio.currentTime ),
      timeLeft = duration - currentTime,
      s, m;

    s = timeLeft % 60;
    m = Math.floor( timeLeft / 60 ) % 60;

    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;

    $('#timeleft').text("-"+m+":"+s);
  });



 // 播放暂停按钮功能
  $("#plays_btn").click(function() {
    if (audio.paused == false) {
      audio.pause();
      clearInterval(dmInter);
      isPlaying = false;
      $("#play_btn").show();
      $("#pause_btn").hide();
    } else {
      audio.play();
      isPlaying = true;
      var dmInter = setInterval(function() {
        console.log(audio.currentTime);
        showDanmu()
      }, 1000);
      $("#play_btn").hide();
      $("#pause_btn").show();
      }
  });

  // 时间线进度轴功能
  //拖放功能
  $slideBar[0].ondragstart = function(event) {
    //拖放开始时
    if (audio.paused == false) {
      audio.pause();
    }
    event.dataTransfer.setData("text", event.target.innerHTML); // Firefox必须加上这一句
    return true;
  };

  //往前拖过时间线上方
  $timeline[0].ondragover = function(event) {
    event.preventDefault(); // 必须
    $leftRange.css('width', event.screenX - (screen.width - totalLen) / 2 + 'px');
    return true;
  };
  //往后拖过
  $leftRange[0].ondragover = function(event) {
    event.preventDefault(); // 必须
    $leftRange.css('width', event.screenX - (screen.width - totalLen) / 2 + 'px');
    return true;
  };

 $timeline[0].ondrop = function(event) {
   var stopPos, lenRadio;
   stopPos = event.screenX - (screen.width - totalLen) / 2;
   //获取鼠标横坐标减去时间轴左边空白即滑动轴所在位置距离时间轴左边的距离
   var lenRadio = stopPos / totalLen; //计算出百分比
   audio.currentTime = audio.duration * lenRadio; // 调整播放位置
   $leftRange.css({
     'width': lenRadio * 100 + '%', // 调整滑动轴位置和颜色
   });
   $slideBar.css('left', '100%');
   if (isPlaying) {
     audio.play();
   }
   return false;
 }

  //准备弹幕数据
  var danmu = {
    '0': ['01', '02', '03'],
    '1': ['11', '12', '13'],
    '3': ['31', '32', '33'],
    '4': ['41', '42', '43'],
    '6': ['61', '62', '63'],
    '7': ['01', '02', '03'],
    '10': ['01', '02', '03'],
    '14': ['01', '02', '03'],
    '17': ['01', '02', '03'],
    '19': ['01', '02', '03'],
    '20': ['01', '02', '03'],
    '30': ['01', '02', '03']
  };
  // 准备标签数据
  var tags = {
    '0': ['这里有个标签'],
    '15': ['这里有个标签'],
    '30': ['这里有个标签'],
    '43': ['这里有个标签'],
    '67': ['这里有个标签'],
    '78': ['这里有个标签'],
    '106': ['这里有个标签'],
    '143': ['这里有个标签'],
    '179': ['这里有个标签'],
    '195': ['这里有个标签'],
    '205': ['这里有个标签'],
  }

  var $danmuBox = $('.back-img');
  //弹幕显示
  function showDanmu() {
    // var pointPos = (event.screenX - (screen.width - totalLen) / 2) / totalLen;
    var curTime = parseInt(audio.currentTime);
       danAtCur = danmu[curTime]; //array
    if (danAtCur) {
      for ( danmuNum in danAtCur ) {
        $('<span>').text(danAtCur[danmuNum]).attr('class', 'danmu')
          .css({
            'top': (parseInt(danmuNum)+1) * 18
          })
          .delay(parseInt(danmuNum)*100)
          .animate({
            right: '100%'
          }, 10000, 'linear', function(){$(this).remove()})
          .appendTo($danmuBox);
      }
    }
  }


  // 添加评论功能
  // 按时间节点显示评论的工具方法
  // function showCom () {
  //   $comBox.empty();
  //   var pointPos = (event.screenX - (screen.width - totalLen) / 2) / totalLen;
  //   var curTime = parseInt((audio.duration * pointPos));
  //      comAtCur = comments[curTime]; //array
  //
  //   for ( com in comAtCur ) {
  //     $('<p>').text(comAtCur[com]).appendTo($comBox);
  //   }
  // }
  // 点击按钮增加评论
  // $submitBtn.click(function() {
  //   showCom();
  //   var content = $('textarea').val(), timeNode;
  //   // 获取评论内容存入js数组，格式：
  //   // {
  //   //   '0': [..,..,..,],
  //   //   '1': [..,..,..,],
  //   //   '2': [..,..,..,],
  //   //   '3': [..,..,..,],
  //   //   '4': [..,..,..,],
  //   // }
  //   if (audio.currentTime == 0) {
  //     timeNode = 0;
  //   } else {
  //     timeNode = parseInt(audio.currentTime);
  //   }
  //   if (comments[timeNode]) {
  //     comments[timeNode].push(content);
  //   } else {
  //     comments[timeNode] = [];
  //     comments[timeNode].push(content);
  //   }
  //   $('<p>').text(content).appendTo($comBox);
  // });

  // 点击时间轴上某一位置，显示当前节点的评论，以秒为节点
  $timeline.click(function() {
    showCom();
  })



});
