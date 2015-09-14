(function () {
	/*
		WindowManager class
	*/

	var WindowManager = function () {
		this._instances = {}
		this.maxZindex = 0;
	}

	WindowManager.prototype.removeAll = function () {
		console.info('Window.remove method aren\'t implemented yet, but i\'ll delete for you');

		for (var w in this._instances) {
			delete this._instances[w]._dom.hide();
			delete this._instances[w];
		}

		this._instances = {};
	}

	WindowManager.prototype.exists = function ( hash, returnObj ) {
		return (this._instances[hash] ? ((returnObj) ? this._instances[hash] : true ) : false);
	}

	WindowManager.prototype.createInstance = function ( config ) {
		return this._instances[Hash()] = new Window ( config );
	}

	/*
		Window class
	*/

	var Window = function ( config ) {

		this._handler = true;
		this.toolbar = true;
		this.draggable = true;
		this.resizable = true;

		this.pos = {
			x: null,
			y: null
		};

		this.dimensions = {
			width : 300,
			height : 400
		}

		for (var property in config) {
			this[property] = config[property];
		}

		this._dom = null;

		this.init ();
	}

	Window.prototype.refresh = function () {}

	Window.prototype.getDom = function () {
		return this._dom;
	}

	Window.prototype.get = function ( search ) {
		var dom = this.getDom ();

		return dom.find ((search) ? search : '.content');
	}

	Window.prototype.init = function () {

		if ( this.dimensions.width <= 200 && this.dimensions.height <= 300) {
			this.sizeClass = "small";
		}

		// dom structure start
		var dom = [];

		dom.push ('<div class="panel">');
		dom.push ('<div class="p-container">');

		// if really have an toolbar or handler
		if ( !this.draggable && !this.toolbar ) {
			this._handler = false;
		}

		if(this._handler) {
			dom.push ('<div class="handler '+ this.sizeClass +'">');

			if(this.name) {
				dom.push ('<span class="name">'+ this.name +'</span>')
			}

			dom.push ('</div>'); // handler
		}

		dom.push ('<div class="content"></div>');

		dom.push('</div>') // container
		dom.push('</div>') // panel

		// structure end

		this._dom = $(dom.join(''));

		var dom = this._dom;

		// zindex for layering when created
		dom.css("zIndex", ++window.WindowManager.maxZindex);

		dom.on('mousedown', function () {
			// the zindex
			$(this).css("zIndex", ++window.WindowManager.maxZindex);

			// set the active window class
			$('.panel').removeClass ("focused");
			$(this).addClass("focused")
		});

		// dimensioning
		dom.width (this.dimensions.width);
		dom.height (this.dimensions.height);

		// positioning
		var pos = {
			x: 0,
			y: 0
		}

		pos.x = (this.pos.x) ? this.pos.x : pos.x;
		pos.y = (this.pos.y) ? this.pos.y : pos.y;

		dom.css('left', pos.x);
		dom.css('top', pos.y);

		// shadow
		if( this.shadow ) {
			dom.addClass("shadow");
		}

		// draggable handler
		if( this.draggable ) {
			dom.draggable ({
				handle: ".handler",
				containment: "body",
				stack: ".panel",

				start: function (e, ui) {
					ui.helper.find('.content').css('opacity', 0.65);
				},

				stop : function (e, ui) {
					ui.helper.find('.content').css('opacity', 1);
				}
			})
		}

		// attach to body
		$('body').prepend(this._dom);
	}

	window.WindowManager = new WindowManager ();

})();