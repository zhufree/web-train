$(function(){
	var $collect;
	$('#btn1').click(function(){
		$collect = $('.cls-a');
		$collect.css('background-color', 'red');
	})
	$('#btn2').click(function(){
		$collect.add('.cls-b').css('background-color', 'red');
	})
	$('#btn3').click(function() {
		$collect.add(document.getElementById('c1')).css('background-color', 'red');
	});
	$('#btn4').click(function() {
		$().add('<div class="cls-c" id="c2">C2</div>').appendTo('#c1');
	});
	$('#btn5').click(function(){
		$collect.add($('.cls-c')).css('background-color', 'red');
	})
	$('#btn6').click(function(){
		$().add('#c2', '#c1').css('background-color', 'blue');
	})

});