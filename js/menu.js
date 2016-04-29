$(function(){
	var num = 0;
	$(document).on( 'click', '.drop-menu>span', function(){
		if ( num % 2 != 0 ) {
			$(this).parent().find('ul').hide();
		} else {
			$(this).parent().find('ul').show();
		}
		num ++;
	} );
	// $('#drop-menu').click(function(){
	// 	if (num % 2 != 0){
	// 		$('ul').hide();
	// 	}else{
	// 		$('ul').show();
	// 	}
	// 	num ++;
	// })
})