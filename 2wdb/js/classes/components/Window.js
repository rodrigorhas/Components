function Window (options) {
	this.options = options;

	if(isset(this.init)) this.init({
		before: true,
		during: true,
		after: true
	});
}

Window.extend(BaseComponent);

Window.prototype.html = '<div class="window focused"><div class="inside-shadow"><div class="handler"></div><div class="content"></div></div></div>';

Window.prototype.close = function () {
	var dom = this.html;
	
	dom.remove();

	X.shortTb.splice(this.id);

}

Window.prototype.center = function (dom){
	var th = parseInt(dom.css('height'), 10);
	var tw = parseInt(dom.css('width'), 10);

	var ww = $(window).width();
	var wh = $(window).height();

	var l = (ww/2) - (tw/2);
	var t = (wh/2) - (th/2);

	dom.css({
		top: t,
		left: l
	})
}

Window.prototype.moveToFirst = function (dom){
	var max = 0;

	$('.window').each(function() {
		var z = parseInt( $( this ).css( "z-index" ), 10 );
		$(this).addClass('unfocused').removeClass('focused');
		max = Math.max( max, z );
	});
		
	dom.css("z-index", max + 2 );
	dom.removeClass('unfocused').addClass('focused');
}

Window.prototype.before = function (dom){
	var __this = this;
	this.renderTo = '.content'
	//var c = (this.draggable && this.draggable.containment) ? this.draggable.containment : 'body';	
	var c = [0,0,0, 0];

	this.moveToFirst(dom);

	var bgs = '.handler .btn-group',
	bgo = dom.find(bgs);
	bgo.disableSelection();

	setTimeout(function () {
		console.log(dom[0].offsetWidth)
		var wh = $(window).height();
		var ww = $(window).width()

		dom.draggable({
			containment: [0,0, ww - dom.width(), wh - dom.find('.handler').height()]
		})
	},1);

	dom.draggable({
		handle: dom.find('.handler'),
		stack: '.window',
		containment: c,
		cancel: bgs,

		start: function (e, ui) {
			if(ui.helper.hasClass('fs')) {
				$(window).trigger('mouseup');
				dom.draggable( 'disable' );
				return
			}

			ui.helper.css('opacity', 0.75);
		},

		stop: function (e, ui){
			ui.helper.css('opacity', 1);
			if(ui.helper.hasClass('fs')) dom.draggable( 'enable' );
			__this.moveToFirst(dom)
		}

	}).css('position', 'absolute');

	dom.resizable({
		minHeight: 38,
		minWidth: 300,
		handles: 'e, s, w, se, sw'
	});

	this.listen = {};
	this.defaults = {};

	this.listen.click = function (e, target) {
	    __this.moveToFirst(dom);
	}

	dom.find('.handler').append('<div class="btn-group"></div>');  // add the btn-group for else case

	if(this.toolbarButtons) {

		if(this.toolbarButtons.minimize){
			dom.find(bgs).append('<span class="icon icon-minus"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,13H5V11H19V13Z" /></svg></span>');
			dom.find(bgs + ' .icon-minus').on('click', function (e){
				__this.minimize();
			});
		}

		if(this.toolbarButtons.fullscreen){
			dom.find(bgs).append('<span class="icon icon-full"><svg viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg></span>');
			dom.find(bgs + ' .icon-full').on('click', function (e){
				__this.toggleFs();
			});
		}

		if(this.toolbarButtons.close){
			var close = dom.find(bgs).append('<span class="icon icon-close"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></span>');
			dom.find(bgs + ' .icon-close').on('click', function (){
				__this.close();
			});
		}

	} else { // only add close button
		var close = dom.find(bgs).append('<span class="icon icon-close"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></span>');
		close.on('click', function (){
			__this.close();
		});
	}

	if(this.title) {
		dom.find('.handler').prepend('<span class="title">' + this.title +'</span>');
	}

	// Create shorTb and add a button or just add a button if shortTb exists
	if($('.window').length + 1 > 1) {
		X.shortTb.push(new Button({label: this.title, refId: this.id}))
	} else {
		new ShortcutToolbar({
			items: [
				new Button({
					label: this.title, refId: this.id,
					listen: {
						click: function (e) {
							if(dom.hasClass('minimized')){
								__this.restore();
							} else {
								__this.minimize();
							}
						}
					}
				})
			]
		})
	}

}

Window.prototype.after = function (dom) {
	dom.appendTo('.view'); // js hack to make an static class Window
	this.center(dom);
}

Window.prototype.setDefaults = function (dom) {
	this.defaults.top = dom.css('top');
	this.defaults.left = dom.css('left');
	this.defaults.width = dom.css('width');
	this.defaults.height = dom.css('height');
}

Window.prototype.toggleFs = function () {
	var dom = $(this.html);


	if(!dom.hasClass('fs')) {
		dom.addClass('fs');

		this.setDefaults(dom);

		dom.animate({
			width: '100%',
			height: '100%',
			top: 0,
			left: 0
		}, 300);
	} else {

		dom.css({
			left: 'auto',
			top: 'auto',
			position: 'absolute'

		})

		
		dom.animate({
			width: this.defaults.width,
			height: this.defaults.height,
			top: this.defaults.top,
			left: this.defaults.left
		}, 300,	function () {
				dom.removeClass('fs');
			}
		);
	}
}

Window.prototype.minimize = function () {
	var dom = this.html;

	this.setDefaults(dom);

	var html = X.shortTb.return(this.id).html;
	var off = html.offset();
	var hh = html.height();
	var hw = html.width;

	dom.animate({
		height: hh,
		width: hw,
		left: off.left,
		top: off.top,
		opacity: 0
	}, 200, function () {
		dom.addClass('minimized');
	});

}

Window.prototype.restore = function () {
	var dom = this.html;

	var def = this.defaults;

	dom.removeClass('minimized');

	dom.animate({
		height: def.height,
		width: def.width,
		left: def.left,
		top: def.top,
		opacity: 1
	}, 250);

}