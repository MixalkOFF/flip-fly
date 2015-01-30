var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

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
			list_item_width = parseInt(block_table_list_item_first.css('width'));
			if (font_size > 18) font_size = 18;
			else if (font_size < 8) font_size = 8;
			body.css({fontSize: font_size + 'px'});
			slider.css('height', height);
			block_table_list_item.each(function() {
				var
					$this = $(this),
					new_item_width = list_item_width;
				if (isMobile.any())
				{
					if ($this.hasClass('block__table--lesson')) new_item_width = new_item_width * 2;
				}
				$this.css('height', new_item_width + 'px');
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