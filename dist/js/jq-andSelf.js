$(function(){
	$('button').click(function() {
		console.log($('div').find('p'));
		$('div').find('p').andSelf().css('border', '2px #ccc solid');
		$("li.third-item").nextAll().andSelf()
	  	.css("background-color", "red");
	});
});