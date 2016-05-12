$( function() {
	$(document).on('click', '.see-more', function() {
		$(this).siblings('ul').find('.hide').show();
	});

	function setTab(eventType, selector, fn) {
		if ( !eventType ) {
			eventType = 'click';
		}
		$(document).on('click', '.tabs>ul>li', function() {
			var tabData = $(this).data('type');
			$('.' + tabData).show().siblings().hide();
		});
		if ( fn && typeof fn == 'function' ) {
			fn();
		}
	};
	setTab('click', '.tabs>ul>li', function() {
		alert('test');
	});
})