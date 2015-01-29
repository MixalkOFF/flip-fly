$(function() {
	var
		slider_down = $('.js-slider__down'),
		block_table = $('.js-block-table');
	slider_down.click(function() {
		$.scrollTo(block_table, 800);
	});
});