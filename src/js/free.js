/**
* Created by admin on 2016/7/13.
*/

$(function(){
  var audio = document.getElementById('audio');
  var isPlaying = false;
  var ajaxInter, showInter, duration, inTime = 0;
  var $leftRange = $('.progressbar_range'),
    $timeline = $('.progressbar_slide'),
    $slideBar = $('.slide-bar');
  var $danmuBox = $('.back-img'),
    $tagBox = $('.tag-box');

  var totalLen = parseInt($timeline.width()); //时间轴总长度
  $('.progressbar_range > img').width(totalLen);

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

  $("#plays_btn").click(function() {
    if (audio.paused == false) {
      audio.pause();
      clearInterval(ajaxInter);
      isPlaying = false;
      $("#play_btn").show();
      $("#pause_btn").hide();
    } else {
      audio.play();
      isPlaying = true;

      showInter = setInterval(function() {
        var curTime = parseInt(audio.currentTime);
        getDanmu(curTime);
        showDanmu(curTime);
      }, 1000);
      $("#play_btn").hide();
      $("#pause_btn").show();
    }
  });

  // 显示标签
  // 火狐
  audio.onloadeddata = showTags();
  // 其他
  audio.addEventListener("loadedmetadata", function () {
  	duration = audio.duration;
    showTags();
  }, false);


  // 播放位置发生改变时，改变左侧长度
  audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime,
      duration = audio.duration;

    // 改变左侧长度
    var progresslen = (currentTime + .25) / duration * 100 * totalLen;
    $leftRange.stop(true, true).animate({'width': (currentTime + .25) / duration * 100 + '%'}, 250, 'linear');
    $slideBar.css('left', '100%');
    if (audio.ended) {
      $("#play_btn").show();
      $("#pause_btn").hide();
      clearInterval(showInter);
    }

    // 改变数值显示
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

  function getDanmu(curTime) {
    if (curTime - inTime >= 60) {
      // getdata
      inTime = curTime;
      console.log('getDanmu at ' + curTime);
      // $.post('url', {
      //   time: curTime
      // }, function(data) {
      //   data = JSON.parse(data);
      //   for (key in data){
      //     danmu[key] = data[key];
      //   }
      // });

      var testData = {
        '60': ['01', '02', '03'],
        '61': ['11', '12', '13'],
        '63': ['31', '32', '33'],
        '64': ['41', '42', '43'],
        '66': ['61', '62', '63'],
        '67': ['01', '02', '03'],
        '70': ['01', '02', '03'],
        '74': ['01', '02', '03'],
        '77': ['01', '02', '03'],
        '79': ['01', '02', '03'],
        '80': ['01', '02', '03'],
        '90': ['01', '02', '03']
      };
      for (key in testData){
        danmu[key] =testData[key];
      }
    }
  }

  function showDanmu(curTime) {
    var danAtCur = danmu[curTime]; //获取当前弹幕
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
    duration = audio.duration;
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
    $.post('url', {
      time: curTime,
      content: dmContent
    }, function() {
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


});
