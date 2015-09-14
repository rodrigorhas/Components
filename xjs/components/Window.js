function Window(options){

	this.id = Hash();
	this.height = 400;
	this.width = 500;

	for (var property in options) {
		this[property] = options[property];
	}

	if(this.id in window.Main.components) {
		return window.Main.components[this.id];
	}

	this._dom = $('<div class="window focused"><div class="inside-shadow"><div class="handler"></div><div class="content"></div></div></div>'	);
	this._dom.attr('id', this.id);

	// event attachs
	this.configListeners();

	this.registerAsComponent();

	this.before();
}

Window.extend(BaseComponent);

Window.prototype.close = function () {
	this._dom.remove();
	delete Main.components[this.id]
	//X.shortTb.splice(this.id);
}

Window.prototype.center = function (){
	var th = this.height;
	var tw = this.width;

	console.log(this._dom.css('height'));

	var ww = $(window).width();
	var wh = $(window).height();

	var l = (ww/2) - (tw/2);
	var t = (wh/2) - (th/2);

	this._dom.css({
		top: t,
		left: l
	})
}

Window.prototype.moveToFirst = function (){
	var max = 0;

	$('.window').each(function() {
		var z = parseInt( $( this ).css( "z-index" ), 10 );
		$(this).addClass('unfocused').removeClass('focused');
		max = Math.max( max, z );
	});
		
	this._dom.css("z-index", max + 2 );
	this._dom.removeClass('unfocused').addClass('focused');
}

Window.prototype.before = function (){
	var __this = this;
	this.renderTo = '.content'
	//var c = (this.draggable && this.draggable.containment) ? this.draggable.containment : 'body';	
	var c = [0,0,0, 0];

	this.moveToFirst(this._dom);

	var bgs = '.handler .btn-group',
	bgo = this._dom.find(bgs);
	bgo.disableSelection();

	setTimeout(function () {
		var wh = $(window).height();
		var ww = $(window).width()

		__this._dom.draggable({
			containment: [0,0, ww - __this._dom.width(), wh - __this._dom.find('.handler').height()]
		})
	},1);

	this._dom.draggable({
		handle: this._dom.find('.handler'),
		stack: '.window',
		containment: c,
		cancel: bgs,

		start: function (e, ui) {
			if(ui.helper.hasClass('fs')) {
				$(window).trigger('mouseup');
				this._dom.draggable( 'disable' );
				return
			}

			ui.helper.css('opacity', 0.75);
		},

		stop: function (e, ui){
			ui.helper.css('opacity', 1);
			if(ui.helper.hasClass('fs')) this._dom.draggable( 'enable' );
			__this.moveToFirst(this._dom)
		}

	}).css('position', 'absolute');

	this._dom.resizable({
		minHeight: 38,
		minWidth: 300,
		handles: 'e, s, w, se, sw'
	});

	this.listen = {};
	this.defaults = {};

	this._dom.on('click',  function (e, target) {
		__this.moveToFirst();
	});
	   

	this._dom.find('.handler').append('<div class="btn-group"></div>');  // add the btn-group for else case

	var closeBtn = this._dom.find(bgs).append('<span class="icon icon-close"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></span>');
	closeBtn.on('click', function (){
		__this.close();
	});

	if(this.toolbarButtons) {

		if(this.toolbarButtons.minimize){
			this._dom.find(bgs).prepend('<span class="icon icon-minus"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,13H5V11H19V13Z" /></svg></span>');
			this._dom.find(bgs + ' .icon-minus').on('click', function (e){
				__this.minimize();
			});
		}

		if(this.toolbarButtons.fullscreen){
			this._dom.find(bgs).prepend('<span class="icon icon-full"><svg viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg></span>');
			this._dom.find(bgs + ' .icon-full').on('click', function (e){
				__this.toggleFs();
			});
		}
	}

	if(this.title) {
		this._dom.find('.handler').prepend('<span class="title">' + this.title +'</span>');
	}

	// Create shorTb and add a button or just add a button if shortTb exists
	/*if($('.window').length + 1 > 1) {
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
	}*/

	this._dom.appendTo('.view'); // js hack to make an static class Window
	this.center();

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