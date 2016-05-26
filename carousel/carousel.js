require.config({
    baseUrl: '../dist/js',
    paths: {
        'jquery': ['http://cdn.bootcss.com/jquery/2.2.3/jquery'],
        'bdtemplate': ['lib/baiduTemplate.min']
    }
});
require(['jquery', 'bdtemplate'],
function( $ ) {
    var bt = baidu.template;
    var dftCarousel = {
        context: '.container',
        slide: false, //silde or change immediately
        hasTitle: true,
        title: 'Carousel',
        hasDot: true,
        // hasController: false,
        direction: 'vertical' //vertical or horizontal
    };

    var it;

    function autoShow(time) { //auto change img
        return setInterval(function() {
            $('.prev').removeClass('prev');
            $('.active').removeClass('active').addClass('prev');
            $next = $('.next');
            $next.removeClass('next').addClass('active');
            if ($next.next().length > 0) {
                $next.next().addClass('next');
            } else {
                $next.siblings().first().addClass('next');
            }
        }, time);
    }

    function autoMove(time, direction) { //auto move img
        return setInterval(function() {
            $('.prev').removeClass('prev');
            var actParams = direction === 'horizontal' ? {left: '-100%'} : {top : '-100%'};
            var nextParams = direction === 'horizontal' ? {left: 0} : {top : 0};
            $('.active').animate(actParams, 'slow', function () {
                $(this).removeClass('active').addClass('prev');
            });
            $('.next').animate(nextParams,'slow', function () {
                $this = $(this);
                $this.removeClass('next').addClass('active');
                var params = direction === 'horizontal' ? {left: '100%'} : {top: '100%'};
                if ($this.next().length > 0) {
                        $this.next().css(params).addClass('next');
                } else {
                        $this.siblings().first().css(params).addClass('next');
                }
            });
        }, time);
    }
    
    $(document).on('click', '.create', function(event) { //create carousels
        event.preventDefault();
        var fnCarousel = {};
        it ? clearInterval(it) : null;
        switch (event.target.id) {
            case 'carousel-direct' :
                $.extend(true, fnCarousel, dftCarousel);
                it = autoShow(3000);
                break;
            case 'carousel-slide-horizontal' :
                $.extend(true, fnCarousel, dftCarousel, {
                    slide: 'true',
                    direction: 'horizontal'
                });
                it = autoMove(3000, fnCarousel.direction);
                break;
            case 'carousel-slide-vertical' :
                $.extend(true, fnCarousel, dftCarousel, {
                    slide: 'true',
                    direction: 'vertical'
                });
                it = autoMove(3000, fnCarousel.direction);
                break;
            default:
                break;
        }
        var carouselDom = bt('testCarousel', fnCarousel);
        $(fnCarousel.context)[0].innerHTML = carouselDom;
    })
    .on('click', '.direct-carousel .cp-carousel-dot', function(event) {
        event.preventDefault();
        /* Act on the event */
        clearInterval(it);
        itemId = $(event.target).attr('href');
        $('.cp-carousel-img' + itemId).addClass('active').siblings().removeClass('active');
        it = autoShow(3000);
    })
    .on('click', '.slide-carousel .cp-carousel-dot', function(event) {
        event.preventDefault();
        /* Act on the event */
        function setDirection() {
            return $(event.target).parents('.slide-horizontal').length > 0 ?
                function(param) { return {left: param};} :
                function(param) { return {top: param};};
        }
        var setParam = setDirection();

        clearInterval(it);
        itemId = $(event.target).attr('href');
        $targetImg = $('.cp-carousel-img' + itemId);//find the img to show
        $targetImg.siblings().removeClass('prev next'); //remove siblings class

        if ($targetImg.prevAll('.active').length > 0) {
            // the img is right to active one, need to slide to left
            $targetImg.css(setParam('100%')).addClass('next'); //make sure of it's position
            $('.active').animate(setParam('-100%'), 'slow').removeClass('active');
            $targetImg.animate(setParam(0), 'slow')//animate to show it
                .removeClass('next')
                .addClass('active');//add active class
        } else if ($targetImg.nextAll('.active').length > 0){
            // the img is left to active one, need to slide to right
            $targetImg.css(setParam('-100%')).addClass('prev'); //make sure of it's position
            $('.active').animate(setParam('100%'), 'slow').removeClass('active');
            $targetImg.animate(setParam(0), 'slow')//animate to show it
                .removeClass('prev')
                .addClass('active');//add active class
        }
        $targetImg.next().length > 0 ?
            $targetImg.next().css(setParam('100%')).addClass('next'):
            $targetImg.siblings().first().css(setParam('100%')).addClass('next');

        $targetImg.prev().length > 0 ?
            $targetImg.prev().css(setParam('-100%')).addClass('prev') :
            $targetImg.siblings().last().css(setParam('-100%')).addClass('prev');
        it = autoMove(3000);
    });
});
