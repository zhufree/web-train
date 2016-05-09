$(function(){
	$(document).on('mouseover', '#menu li,#user', function(event) {
		event.preventDefault();
		$(event.target).next('.dropdown-menu,#user-ctrl').show();
	})
	.on('mouseout', '#menu li,#user', function(event) {
		event.preventDefault();
		$(event.target).closest('.dropdown-menu,#user-ctrl').hide();
	})
	.on('click', '.dot', function(event) {
		event.preventDefault();
		$this = $(event.target);
		$this.addClass('on');
		$this.siblings().removeClass('on');
		$("#recommend>ul:not('#ul-"+$this.attr('id').substr(-1)+"')").hide();
		$("#recommend>ul#ul-"+$this.attr('id').substr(-1)).show();
	})
	.on('click', '#top', function(event) {
		event.preventDefault();
		$(window).scrollTop('0');
	});
});
