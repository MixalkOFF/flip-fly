app.i =
{
	body: {},
	body_width: 0,
	body_height: 0,
	body_font_size: 10,
	slider: {},
	slider_down: {},
	menu: {},
	menu_button: {},
	block_table: {},
	block_table_first_item: {},
	block_table_items: {},
	block_table_first_div: {},
	block_table_anchors: {}
};
app.handlers =
{
	init: function()
	{
		app.handlers.resize();
		app.handlers.slideDown(app.i.slider_down);
		app.handlers.openHeaderMenu(app.i.menu_button);
	},
	resize: function()
	{
		$(window).resize(function() {
			app.i.body_width = parseInt(app.i.body.width());
			app.i.body_height = parseInt(app.i.body.height());
			app.i.body_font_size = (app.i.body_width + app.i.body_height) / 196;
			app.handlers.bodyHandler();
			app.handlers.headerMenuHandler();
			app.handlers.sliderHandler();
			app.handlers.blockTableHandler();
		});
		$(window).resize();
	},
	bodyHandler: function()
	{
		if (app.i.body_font_size > 18) app.i.body_font_size = 18;
		else if (app.i.body_font_size < 8) app.i.body_font_size = 8;
		app.i.body.css({fontSize: app.i.body_font_size + 'px'});
	},
	headerMenuHandler: function()
	{
		if (app.i.body_width > 1024 && app.i.menu.css('display') == 'none')
		{
			app.i.menu.css('display', 'block');
		}
	},
	sliderHandler: function()
	{
		app.i.slider.css('height', app.i.body_height);
	},
	blockTableHandler: function()
	{
		app.i.block_table_items.each(function() {
			var
				$this = $(this),
				width = parseInt(app.i.block_table_first_item.css('width'));
			if (app.i.body_width < 680)
			{
				if ($this.hasClass('block__table--lesson')) width = width * 2;
			}
			$this.css('height', width + 'px');
		});
		app.i.block_table_anchors.each(function() {
			var
				$this = $(this),
				width = app.i.block_table_first_div.css('width'),
				height = app.i.block_table_first_div.css('height');
			if (app.i.body_width < 680)
			{
				if ($this.parents('li').hasClass('js-block-table-lesson'))
				{
					width = $this.parent('div').css('width');
					height = $this.parent('div').css('height');
				}
			}
			$this.css({
				'width': width,
				'height': height
			});
		});
	},
	slideDown: function(e)
	{
		e.click(function() {
			$.scrollTo(app.i.block_table, 800);
		});
	},
	openHeaderMenu: function(e)
	{
		e.click(function() {
			if (app.i.menu.hasClass('is-active')) {
				app.i.menu.animate({height: 'hide'}, 1000).removeClass('is-active');
			} else {
				app.i.menu.animate({height: 'show'}, 1000).addClass('is-active');
			}
			return false;
		});
	}
};
app.init = function()
{
	app.i.body = $('body');
	app.i.slider = $('.js-slider');
	app.i.slider_down = $('.js-slider-down');
	app.i.menu = $('.js-header-menu');
	app.i.menu_button = $('.js-header-menu-open');
	app.i.block_table = $('.js-block-table');
	app.i.block_table_first_item = app.i.block_table.find('li:eq(0)');
	app.i.block_table_items = app.i.block_table.find('li');
	app.i.block_table_first_div = app.i.block_table_first_item.find('div');
	app.i.block_table_anchors = app.i.block_table_items.find('.js-anchor');
	if (app.isMobile.any()) app.i.body.addClass('mobile');
	app.handlers.init();
};

$(function() {
	app.init();
});

$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});