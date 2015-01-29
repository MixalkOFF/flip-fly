var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
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
		block_table_div = block_table.find('li:eq(0) div'),
		block_table_items = block_table.find('div > a');
	$(window).resize(function() {
		var
			width = parseInt(body.width()),
			height = parseInt(body.height()),
			font_size = (width + height) / 196;
			if (font_size > 18) font_size = 18;
			else if (font_size < 8) font_size = 8;
			body.css({fontSize: font_size + 'px'});
			slider.css('height', height);
			block_table.css('height', block_table.css('width'));
			block_table_items.each(function() {
				$(this).css({
					'width': block_table_div.css('width'),
					'height': block_table_div.css('height')
				});
			});
	});
	$(window).resize();
});