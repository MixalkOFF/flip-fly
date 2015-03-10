app.i =
{
	body: {},
	body_width: 0,
	body_height: 0,
	body_font_size: 10,
	slider: {},
	slider_typography: {},
	slider_gallery: {},
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
			app.handlers.sliderGalleryHandler();
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
	sliderGalleryHandler: function()
	{
		if (app.i.body_width > 680) app.i.slider_gallery.css('height', app.i.body_height - 74 + 'px');
		else app.i.slider_gallery.css('height', app.i.body_height);
	},
	sliderTypographyHandler: function()
	{
		var width = parseInt(app.i.slider_typography.css('width'))/3;
		if (app.i.body_width) app.i.slider_typography_li.css({
			height: width + 'px',
			width: width + 'px'
		});
		if((typeof $('cycle-slideshow') !=="undefined")){
		if (app.i.body_width) app.i.slider_typography_li.css({
			height: width + 'px'
		});}
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
		var
			gallery_height = parseInt(app.i.gallery_photo.css('height')),
			height;
		app.i.gallery_photo_div.css('height', (app.i.body_height - 74) + 'px');
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
	app.i.slider_gallery = $('.js-slider-gallery');
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
	app.i.gallery_photo_div = app.i.gallery_photo;
	app.i.gallery_photo_anchor = app.i.gallery_photo.find('');
	if (app.isMobile.any()) app.i.body.addClass('mobile');
	app.handlers.init();
};

$(function() {
	app.init();
});


$('.js-popup-open').click(function(){
	$('.js-popup').css('display', 'block');
});

$('.js-popup-close').click(function(){
	$('.js-popup').css('display', 'none');
});

$(function(){
	var gallery = $('.js-gallery-photo-pager'),
		gallery_photo_height = parseInt(gallery.find('> div:eq(0)').css('height')),
		gallery_up = $('.js-gallery__photo__up'),
		gallery_down = $('.js-gallery__photo__down'),
		page = 1,
		maxPage = gallery.find('>div').length / 5,
		status = true;
	gallery_up.click(function(){
		if (page > 1 && status) {
			status = false;
			page--;
			gallery.animate({
				"marginTop": '-' + ((gallery_photo_height * 5) * (page - 1)) + 'px'
			}, 1000);
			setTimeout(function(){
				status = true;
			}, 1010);
		}
	});
	gallery_down.click(function(){
	if (page < maxPage && status) {
			status = false;
			gallery.animate({
				"marginTop": '-' + ((gallery_photo_height * 5) * page) + 'px'
			}, 1000);
			page++;
			setTimeout(function(){
				status = true;
			}, 1010);
		}
	});
});

var time = new Date();
//alert(time.getHours());
a=Math.floor((Math.random() * 3) + 1);

if ((time.getHours()<=22 && time.getMinutes()<=30 && time.getHours()>=8) || (time.getHours()<23 && time.getHours()>=8) || (time.getHours()>=7 && time.getHours()<=30 && time.getHours()<=22)){
	b=(time.getHours() %10 )+23;
	$('.header__loader__line__in').width(b+"%");
	$('.header__loader__line__in').css('backgroundColor', '#6FC5D8')
	$('.header__loader__caption').html("Сейчас центр загружен на "+b+"%" );

}
else
{
	b=0;
	$('.header__loader__line__in').width(b+"%");
	$('.header__loader__caption').html("Сейчас центр загружен на "+b+"%" );

}
