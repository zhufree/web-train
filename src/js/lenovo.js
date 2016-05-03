$(function(){
    $(document).on('mouseover', 'nav a,#tabs>a,#broadcast>p,#discuss>a,#titles>ul a', function(event) {
        event.preventDefault();
        $(event.target).addClass('hover-link');
    })
    .on('mouseout', 'nav a,#tabs>a,#broadcast>p,#discuss>a,#titles>ul a', function(event) {
        event.preventDefault();
        $(event.target).removeClass('hover-link');
    })
    .on('mouseover', '#search-ad>li', function(event) {
        event.preventDefault();
        $(event.target).css({
            'backgroundColor': '#bdbdbd',
            'color': '#fff'
        });
    })
    .on('mouseout', '#search-ad>li', function(event) {
        event.preventDefault();
        $(event.target).css({
            'backgroundColor': '#fff',
            'color': '#bdbdbd'
        });
    })
    .on('mouseover', '#left-list>a>li', function(event) {
        event.preventDefault();
        $(event.target).css({
            'backgroundColor': '#f5f5f5',
            'color': 'red'
        });
        $('#detail').show();
    })
    .on('mouseout', '#left-list>a>li', function(event) {
        event.preventDefault();
        $(event.target).css({
            'backgroundColor': '#fff',
            'color': '#000'
        });
    })
    .on('mouseout', '#detail', function(event) {
        event.preventDefault();
        $('#detail').hide();
    })
    .on('mouseover', '#star', function(event) {
        event.preventDefault();
        $(event.target).closest('li').addClass('top-red');
    })
    .on('mouseout', '#star', function(event) {
        event.preventDefault();
        $(event.target).closest('li').removeClass('top-red');
    })
    .on('mouseover', '.floor>ul>li', function(event) {
        event.preventDefault();
        $(event.target).closest('img').css('position', 'relative').animate({
            left:'+=20px',
        },'slow').animate({
            left:'-=20px',
        }, 'slow');
    })
    .on('mouseover', '#social-floor', function(event) {
        event.preventDefault();
        $(event.target).closest('li').addClass('shadow');
    })
    .on('mouseout', '#social-floor', function(event) {
        event.preventDefault();
        $(event.target).closest('li').removeClass('shadow');
    })
    .on('mouseover', '#service .single-serv', function(event) {
        event.preventDefault();
        $(event.target).addClass('hover-li');
    })
    .on('mouseout', '#service .single-serv', function(event) {
        event.preventDefault();
        $(event.target).removeClass('hover-li');
    });
});