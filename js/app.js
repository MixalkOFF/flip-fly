$(function() {

	var
		body = $('body'),
		slider = $('.js-slider'),
		block_table = $('.js-block-table'),
		block_table_list_item_first = block_table.find('li:eq(0)'),
		block_table_list_item = block_table.find('li'),
		block_table_div = block_table.find('li:eq(0) div'),
		block_table_items = block_table.find('div > a'),
		slider_down = $('.js-slider__down'),
		menu_button = $('.js-header__menu__open'),
		menu = $('.js-header__menu');

	$(window).resize(function() {
		var
			width = parseInt(body.width()),
			height = parseInt(body.height()),
			font_size = (width + height) / 196,
			list_item_width = block_table_list_item_first.css('width');
			if (font_size > 18) font_size = 18;
			else if (font_size < 8) font_size = 8;
			body.css({fontSize: font_size + 'px'});
			slider.css('height', height);
			block_table_list_item.each(function() {
				var $this = $(this);
				if ($this.hasClass('block__table--lesson')) $this.css('height', (parseInt(list_item_width) * 2) + 'px');
				else $this.css('height', list_item_width);
			});
			block_table_items.each(function() {
				$(this).css({
					'width': block_table_div.css('width'),
					'height': block_table_div.css('height')
				});
			});
		if (width > 1024 && menu.css('display') == 'none')
		{
			menu.css('display', 'block');
		}
	});

	$(window).resize();

	slider_down.click(function() {
		$.scrollTo(block_table, 800);
	});

	menu_button.click(function() {
		if (menu.hasClass('is-active')) {
			menu.animate({height: 'hide'}, 1000).removeClass('is-active');
		} else {
			menu.animate({height: 'show'}, 1000).addClass('is-active');
		}
		return false;
	});
});