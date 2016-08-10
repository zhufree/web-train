/**
* Created by admin on 2016/7/13.
*/

$(function(){
  var audio = document.getElementById('audio');
  var isPlaying = false, tagFlag = false;
  var ajaxInter, showInter, duration, inTime = 0;
  var $leftRange = $('.progressbar_range'),
    $timeline = $('.progressbar_slide'),
    $slideBar = $('.slide-bar');
  var $danmuBox = $('.back-img'),
    $tagBox = $('.tag-box');

  var totalLen = parseInt($timeline.width()); //时间轴总长度
  $('.progressbar_range > img').width(totalLen);

  // 准备弹幕数据
  var danmus = {
    '0': ['01', '02', '03'],
    '1': ['11', '12', '13'],
    '3': ['31', '32', '33'],
    '4': ['41', '42', '43'],
    '6': ['61', '62', '63'],
    '7': ['01', '02', '03'],
    '10': ['101', '102', '103'],
    '14': ['141', '142', '143'],
    '17': ['171', '172', '173'],
    '19': ['191', '192', '193'],
    '20': ['201', '202', '203'],
    '30': ['301', '302', '303']
  };
  // 准备标签数据
  var tags = {
    '00:00:23': '主播及嘉宾介绍',
    '00:02:30': '“Walking Simulator”',
    '00:06:30': '《看火人》设计简述',
    '00:08:55': 'Metroidvania 要素对《看火人》的影响',
    '00:14:44': '对讲机的设计',
    '00:18:00': '《看火人》在代入感上的一些问题',
    '00:24:04': '玩家在叙事游戏中对“故事原因”的追求',
    '00:31:10': '《看火人》美术设计',
    '00:32:17': '一些美术技术的讨论',
    '00:39:18': '美术在交互上产生的一些问题',
    '00:47:02': '《看火人》如何结合叙事和系统',
    '00:54:02': '对《看火人》结局的讨论',
    '01:00:50': '三种叙事原型',
    '01:05:50': '人物形象设计及性别因素',
    '01:10:37': '第一人称形象与玩家的关系',
    '01:15:50': '女性角色设计'
  };
  // 标签颜色列表
  var poleColor = [
    '#D05A6E', //IMAYOH
    '#8F77B5', //SHION紫苑
    '#AB3B3A', //SHINSYU
    '#89916B', //BAIKOCHA
    '#F19483', //AKEBONO
    '#60373E', //MURASAKITOBI
    '#563F2E', //KOGECHA
    '#90B44B',
    '#69B0AC',
    '#B28FCE',
    '#BDC0BA',
  ]

  $("#plays_btn").click(function() {
    if (audio.paused == false) {
      audio.pause();
      clearInterval(showInter);
      isPlaying = false;
      $("#play_btn").show();
      $("#pause_btn").hide();
    } else {
      audio.play();
      isPlaying = true;

      showInter = setInterval(function() {
        var curTime = parseInt(audio.currentTime);
        showDanmu(curTime);
      }, 1000);
      $("#play_btn").hide();
      $("#pause_btn").show();
    }
  });

  // 其他

  // 火狐
  if(navigator.userAgent.indexOf('Firefox') > 0) {
    audio.oncanplay = getAndShow();
  } else {
    audio.addEventListener("canplay", function () {
        getAndShow();
    }, false);
  }

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

    h = Math.floor(timeLeft / 3600);
    s = timeLeft % 60;
    m = Math.floor( timeLeft / 60 ) % 60;
    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;
    h = h < 10 ? "0"+h : h;

    $('#timeleft').text(h + ":"+m+":"+s);

    // 播放到某一标签范围内时高亮该标签
    var curTag;
    for (tag in tags) {
      var secTime = parseInt(tag.substr(0,2))*3600 + parseInt(tag.substr(3,2))*60 + parseInt(tag.substr(6,2));
      if (currentTime == secTime) {
        curTag = tag;
      }
    }
    $('.tag-label').each(function(i, e) {
      $this = $(this);
      if ($this.text() == tags[curTag]) {
        $this.show(1000);
        $this.addClass('cur-label');
        $this.prev('.tag-label').removeClass('cur-label');
      } else {
        // $(this).togg
      }
    })
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

  function showDanmu(curTime) {
    var danAtCur = danmus[curTime]; //获取当前弹幕
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

  function temp() {
    for (tag in tags) {
      var secTime = parseInt(tag.substr(0,2))*3600 + parseInt(tag.substr(3,2))*60 + parseInt(tag.substr(6,2));
      // var tagColor = poleColor[parseInt(Math.random()*10.5)];
      // var tagColor = '#7DB9DE';
      // var tagHeight = Math.random() * 100 + '%';
      // 添加DOM
      $('<div>').attr('class', 'tag-pole')
        .css({
          'left': secTime / duration * 100 + '%',
          'top': 0,
          // 'height': (parseInt(tagHeight) + 100) + '%',
          height: '100%',
          // 'background-color': tagColor
        })
        .appendTo($timeline);
      $('<div>').attr('class', 'tag-dot')
        .css({
          'left': secTime / duration * 100 + '%',
          'top': 0,
        })
        .appendTo($tagBox);
      $('<div>').text(tags[tag]).attr('class', 'tag-label')
        .css({
          'left': secTime / duration * 100 + '%',
          // 'top': tagHeight,
          'top': 0,
          // 'background-color': tagColor
        })
        .appendTo($tagBox);
    }

    // 点击标签跳转到该位置播放
    $('.tag-label').on('click', function() {
      var lenRadio = (parseInt($(this).css('left'))) / totalLen; //计算出百分比
      audio.currentTime = audio.duration * lenRadio; // 调整播放位置
      $leftRange.css({
       'width': lenRadio * 100 + '%', // 调整滑动轴位置和颜色
      });
      $slideBar.css('left', '100%');
      if (isPlaying) {
       audio.play();
      }
      // $(this).prev().hide();
      $(this).addClass('cur-label')
        .siblings('.tag-label').each(function() {
          $(this).removeClass('cur-label').hide().prev().show();
        })
    })
    .on('mouseleave', function() {
      $this = $(this);
      $this.css('z-index', 9);
      if (!this.classList.contains('cur-label')) {
        $this.hide().prev().show();
        $this.css('z-index', 9);
      } else {
        $this.css('z-index', 10);
      }
    });

    $('.tag-dot').on('mouseover', function() {
      $(this).next().show().css('z-index', 11)
        .siblings('.tag-label').css('z-index', 9);
    });
    // .on('mouseleave', function() {
    //   $(this).next().hide();
    // });
  }
  function getAndShow () {
    // 音频准备完成时，加载并标签和弹幕列表，标签直接渲染，弹幕储存
    duration = audio.duration;
    // $.post('url', {audioId: 'xxx'}, function(data) {
    //   tags = JSON.parse(data);
    //   for (tag in tags) {
    //     var tagColor = poleColor[parseInt(Math.random()*6.5)];
    //     $('<div>').attr('class', 'tag-pole')
    //       .css({
    //         'left': (tag - 0) / duration * 100 + '%',
    //         'top': 0,
    //         'background-color': tagColor
    //       })
    //       .appendTo($timeline);
    //     $('<div>').text(tags[tag]).attr('class', 'tag-label')
    //       .css({
    //         'left': (tag - 0) / duration * 100 + '%',
    //         'top': 0,
    //         'background-color': tagColor
    //       })
    //       .appendTo($tagBox);
    //   }
    // });
    temp();
    // $.post('url', {
    //   audioId: '0001'
    // }, function(data) {
    //   danmus = JSON.parse(data);
    // });
  }


  // 用户增加弹幕
  var $submitBtn = $('#danmu-btn'),
    $danmuInp = $('#danmu');
  $submitBtn.click(function() {
    var dmContent = $danmuInp.val(),
      curTime = parseInt(audio.currentTime);//获取当前时间,这里是变值
    var danAtCur = danmu[curTime]; //获取当前弹幕
    var danmuNum = danAtCur ? danAtCur.length : 0;
    if (dmContent.length > 0) {
      // 发送到后台。。。
      $.post('url', {
        username: 'username',
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
    } else {
      alert('内容不能为空');
    }

  });



});
