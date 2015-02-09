app.i =
{
	body: {},
	body_width: 0,
	body_height: 0,
	body_font_size: 10,
	slider: {},
	slider_typography: {},
	slider_typography_li: {},
	slider_down: {},
	menu: {},
	menu_button: {},
	block_table: {},
	block_table_first_item: {},
	block_table_items: {},
	block_table_first_div: {},
	block_table_anchors: {},
	gallery_image: {},
	gallery_photo: {},
	gallery_photo_div: {},
	gallery_photo_anchor: {}
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
			app.handlers.sliderTypographyHandler();
			app.handlers.blockTableHandler();
			app.handlers.galleryImageHandler();
			app.handlers.galleryPhotoHandler();
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
		if (app.i.body_width > 680) app.i.slider.css('height', app.i.body_height);
		else app.i.slider.css('height', app.i.body_height / 2);
	},
	sliderTypographyHandler: function()
	{
		var width = parseInt(app.i.slider_typography.css('width'))/3;
		if (app.i.body_width) app.i.slider_typography_li.css({
			height: width + 'px',
			width: width + 'px'
		});
		else app.i.slider_typography.css('height', app.i.body.height);
	},
	galleryImageHandler: function()
	{
		if (app.i.body_width < 680)
		{
			app.i.gallery_image.css('height', app.i.body_width);
		}
		else
		{
			app.i.gallery_image.removeAttr('style');
		}
	},
	galleryPhotoHandler: function()
	{
		var
			gallery_width = parseInt(app.i.gallery_photo.css('width')),
			width;
		app.i.gallery_photo_div.css('width', (gallery_width + 10) + 'px');
		if (app.i.body_width < 680)
		{
			width = gallery_width / 4;
			app.i.gallery_photo_anchor.each(function(){
				var $this = $(this);
				if ($this.index() > 7) $this.css('display', 'none');
				else $this.css('display', 'block');
			});
		}
		else if (app.i.body_width < 1024)
		{
			width = gallery_width / 6;
			app.i.gallery_photo_anchor.each(function(){
				var $this = $(this);
				if ($this.index() > 5) $this.css('display', 'none');
				else $this.css('display', 'block');
			});
		}
		else
		{
			width = gallery_width / 6;
			app.i.gallery_photo_anchor.css('display', 'block');
		}
		app.i.gallery_photo_anchor.css({
			width: width + 'px',
			height: width + 'px'
		});
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
	app.i.slider_typography = $('.js-slider-typography');
	app.i.slider_typography_li = app.i.slider_typography.find('li');
	app.i.slider_down = $('.js-slider-down');
	app.i.menu = $('.js-header-menu');
	app.i.menu_button = $('.js-header-menu-open');
	app.i.block_table = $('.js-block-table');
	app.i.block_table_first_item = app.i.block_table.find('li:eq(0)');
	app.i.block_table_items = app.i.block_table.find('li');
	app.i.block_table_first_div = app.i.block_table_first_item.find('div');
	app.i.block_table_anchors = app.i.block_table_items.find('.js-anchor');
	app.i.gallery_image = $('.js-gallery-image');
	app.i.gallery_photo = $('.js-gallery-photo');
	app.i.gallery_photo_div = app.i.gallery_photo.find('.js-gallery-photo-pager');
	app.i.gallery_photo_anchor = app.i.gallery_photo.find('a');
	if (app.isMobile.any()) app.i.body.addClass('mobile');
	app.handlers.init();
};

$(function() {
	app.init();
});