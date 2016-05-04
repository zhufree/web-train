$(function(){
	$(document).on('mouseover', '#menu li,#user', function(event) {
		event.preventDefault();
		$(event.target).next('.dropdown-menu,#user-ctrl').show();
	}).on('mouseout', '#menu li,#user', function(event) {
		event.preventDefault();
		$(event.target).next('.dropdown-menu,#user-ctrl').hide();
	});
});
