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

  // 准备弹幕数据
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
    '0': ['这里有个标签0'],
    '15': ['这里有个标签1'],
    '30': ['这里有个标签2'],
    '43': ['这里有个标签3'],
    '67': ['这里有个标签4'],
    '78': ['这里有个标签5'],
    '106': ['这里有个标签6'],
    '143': ['这里有个标签7'],
    '179': ['这里有个标签8'],
    '195': ['这里有个标签9'],
    '205': ['这里有个标签10'],
  }
  // 标签颜色列表
  var poleColor = [
    '#D05A6E', //IMAYOH
    '#8F77B5', //SHION紫苑
    '#AB3B3A', //SHINSYU
    '#89916B', //BAIKOCHA
    '#F19483', //AKEBONO
    '#60373E', //MURASAKITOBI
    '#563F2E', //KOGECHA

  ]
  var $danmuBox = $('.back-img'),
    $tagBox = $('.tag-box');

  var duration;

  var dmInter;
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
      dmInter = setInterval(function() {
        showDanmu();
      }, 1000);
      $("#play_btn").hide();
      $("#pause_btn").show();
      }
    });

  // 播放位置发生改变时，改变左侧长度
  audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime,
      duration = audio.duration;

    var progresslen = (currentTime + .25) / duration * 100 * totalLen;
    $leftRange.stop(true, true).animate({'width': (currentTime + .25) / duration * 100 + '%'}, 250, 'linear');
    $slideBar.css('left', '100%');
    if (audio.ended) {
      $("#play_btn").show();
      $("#pause_btn").hide();
    }
  });
  // 改变数值显示
  audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime,
      duration = audio.duration;

    var timeleft = document.getElementById('timeleft'),
      duration = parseInt( duration ),
      currentTime = parseInt( currentTime ),
      timeLeft = duration - currentTime,
      s, m;

    s = timeLeft % 60;
    m = Math.floor( timeLeft / 60 ) % 60;

    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;

    $('#timeleft').text("-"+m+":"+s);
  });

  audio.addEventListener('canplay', function() {
    duration = audio.duration;
    showTags();
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
  // 松开鼠标时
  $timeline[0].ondrop = function(event) {
    var stopPos, lenRadio;
    stopPos = event.screenX - (screen.width - totalLen) / 2;
    //获取鼠标横坐标减去时间轴左边空白即滑动轴所在位置距离时间轴左边的距离
    var lenRadio = stopPos / totalLen; //计算出百分比
    currentTime = duration * lenRadio; // 调整播放位置
    $leftRange.css({
     'width': lenRadio * 100 + '%', // 调整滑动轴位置和颜色
    });
    $slideBar.css('left', '100%');
    if (isPlaying) {
     audio.play();
    }
    return false;
  }

  function showDanmu() {
    var curTime = parseInt(audio.currentTime);//获取当前时间,这里是变值
      danAtCur = danmu[curTime]; //获取当前弹幕
    if (danAtCur) {
      for ( danmuNum in danAtCur ) {
        $('<span>').text(danAtCur[danmuNum]).attr('class', 'danmu')
          .css({
            'top': (parseInt(danmuNum)+1) * 18 + 'px'
          })
          .delay(parseInt(danmuNum)*100)
          .animate({
            right: '100%'
          }, 10000, 'linear', function(){
            $(this).remove();
          })
          .appendTo($danmuBox);
      }
    }
  }

  function showTags () {
    for (tag in tags) {
      var tagColor = poleColor[parseInt(Math.random()*6.5)];
      $('<div>').attr('class', 'tag-pole')
        .css({
          'left': (tag - 0) / duration * 100 + '%',
          'top': 0,
          'background-color': tagColor
        })
        .appendTo($timeline);
      $('<div>').text(tags[tag]).attr('class', 'tag-label')
        .css({
          'left': (tag - 0) / duration * 100 + '%',
          'top': 0,
          'background-color': tagColor
        })
        .appendTo($tagBox);
    }
  }


  // 用户增加弹幕
  var $submitBtn = $('#danmu-btn'),
    $danmuInp = $('#danmu');
  $submitBtn.click(function() {
    var dmContent = $danmuInp.val(),
      curTime = parseInt(audio.currentTime);//获取当前时间,这里是变值
    var danAtCur = danmu[curTime]; //获取当前弹幕
    var danmuNum = danAtCur ? danAtCur.length : 0;
    // 发送到后台。。。

    // 直接显示
    $('<span>').text(dmContent).attr('class', 'danmu')
      .css({
        'top': (parseInt(danmuNum)+1) * 18 + 'px'
      })
      .delay(parseInt(danmuNum)*100)
      .animate({
        right: '100%'
      }, 10000, 'linear', function(){
        $(this).remove();
      })
      .appendTo($danmuBox);
  });

});
