function Main () {

}

Main.prototype = {
	controller: function (controllerName, config, fn) {
		var _this = this;

		$(document).on('x-ready', function () {
			setTimeout(function () {

					if( isset(config) && isset(config.stores) ){
						var stores = {};

						if(config.stores.length > 1 ){
							for (var i = 0; i < config.stores.length; i++) {
								var name = config.stores[i];
								stores[name] = Stores.get(name);
							};
						} else {
							stores = _this.Stores.get(config.stores[0]);
						}
					}

					if(!window.Model) window.Model = {};
					
					var res = Inspector.match(controllerName);
					if(typeof res.scp == 'object'){
						fn(res.scp, stores, res.view);
					}
			},10)
		})


	},

	model : function (name, object) {

		if ( !isset(window['Model']) ) window['Model'] = {}

		var fn = new Function(object.id, object.values,
		'return function ' + name + '(id, values){\
			this.id = id;\
			this.fields = '+ JSON.stringify(object.fields) +';\
			this.values = values;\
			return {id: this.id, fields: this.fields, values: this.values};\
		}');

		var newFn = fn();

		newFn.extend(Model)

		window.Model[name] = newFn;

	},

	view: function (fn) {
		$(document).on('x-ready', fn);
	},

	loadFile: function (namespace, base) {
		var pa = namespace.split('.');

		var file = pa[pa.length-1];
		var extension = '.js';

		var path = "";

		for (var i = 1; i < pa.length - 1 ; i++) {
			path += pa[i] + '/';
			console.log('folder => ' + pa[i]);
		};
		console.debug('file => ' +file)

		console.info('Final path url => ' + path + file + extension)

	},

	application: function (options) {
		function loadScript (url, callback){
		    var head = document.getElementsByTagName('head')[0];
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = url;
		    script.onreadystatechange = callback;
		    script.onload = callback;
		    script.onerror = callback;
		    head.appendChild(script);
		}

		$.event.special.inputchange = {
		    setup: function() {
		        var self = this, val;
		        $.data(this, 'timer', window.setInterval(function() {
		            val = self.value;
		            if ( $.data( self, 'cache') != val ) {
		                $.data( self, 'cache', val );
		                $( self ).trigger( 'inputchange' );
		            }
		        }, 20));
		    },
		    teardown: function() {
		        window.clearInterval( $.data(this, 'timer') );
		    },
		    add: function() {
		        $.data(this, 'cache', this.value);
		    }
		};

		window.Main.components = [];

		for(var property in options){
			this[property] = options[property];
		}

		this.requires.unshift('Brackets');
		this.requires.unshift('Factory');
		this.requires.unshift('baseComponent');

		if(isset(this.requires)){
			var count = 1;
			
			var	$this = this;

			loadScript('js/classes/components/' + this.requires[0] + '.js', function(error){

				for (var i = 1; i < $this.requires.length; i++) {
					loadScript('js/classes/components/' + $this.requires[i] + '.js', function(error){
						if(error.type == 'error') return console.error('Dependencia nao encontrada => ' + error.target.src );

						count++;
						if(count == $this.requires.length){
							console.log('done')
							$(document).trigger('x-ready');
						}
					});
				};

			})

		}
	},

	find: function (string, dom, returnObj) {
		var p = string.split(':'),
		p1 = p[0],
		p2 = p[1],
		res;

		console.log(p, p1, p2)

		if(p1 == 'parent') {
			res = dom.parents(p2);
		} else if(p1 == 'child') {
			res = dom.find(p2);
		} else if(p1 == 'sibling') {
			res = dom.parent().children(p2);
		} else if (p1 == 'global') {
			res = $('body').find(p2);
		}

		var id = res.attr('id')

		if(isset(returnObj)) {
			for (var i = 0; i < window.Main.components.length; i++) {
				if(window.Main.components[i].id == id) {
					res = {dom: res, obj: window.Main.components[i]}
				}
			};
		}

		return (isset(res)) ? res : false;
	},

	shortTb: {
		return: function (id) {
			for (var i = 0; i < window.Main.components.length; i++) {
				if(window.Main.components[i].constructor.name == 'ShortcutToolbar'){
					var c = window.Main.components[i];
					if(isset(id)) {
						for (var u = 0; u < c.items.length; u++) {
							if(c.items[u].refId == id){
								return c.items[u];
							}
						};
					} else {
						return window.Main.components[i];
					}
				}
			};
		},

		push: function (item) {
			for (var i = 0; i < window.Main.components.length; i++) {
				if(window.Main.components[i].constructor.name == 'ShortcutToolbar'){
					window.Main.components[i].items.push(item);
				}
			};
		},

		splice: function (id, index, length) {
			for (var i = 0; i < window.Main.components.length; i++) {
				if(window.Main.components[i].constructor.name == 'ShortcutToolbar'){
					var c = window.Main.components[i];
					if(isset(id)){
						for (var u = 0; u < c.items.length; u++) {
							if(c.items[u].refId == id){
								c.items.splice(u, 1);
							}
						};
					} else {
						c.items.splice(index, length);
					}
				}
			};
		},
	},
	
	effects: {
		loadRipple: function (){
			var trasholder;
		    var doneTypingInterval = 450;

			$('.ripple').on('mousedown', function (e){
				$this = $(this);

				$this.disableSelection();

				var color = $this.css('color');

				var parent = $(this);
				parent.css({position: 'relative', overflow: 'hidden'});

				var wave = $this.children('.waves');

				var waveElement = "<span class='waves'></span>";
				if(parent.find(".waves").length == 0) {

					parent.prepend(waveElement);
					wave = $this.children('.waves');

				} else if($this.children('.waves').hasClass('animating')) {

					parent.prepend(waveElement);
					wave = $this.children('.waves');

				}

				$this.addClass('pressed');

				if(!wave.height() && !wave.width())
				{
					d = Math.max(parent.outerWidth(), parent.outerHeight());
					wave.css({height: d, width: d});
				}
				
				x = e.pageX - parent.offset().left - wave.width()/2;
				y = e.pageY - parent.offset().top - wave.height()/2;
				
				wave.css({top: y+'px', left: x+'px', backgroundColor: color, opacity: 0.27}).addClass("animate");
				wave.animate({transform: 'scale(2.5)'});
				
				clearTimeout(trasholder);
				trasholder = setTimeout(function () { parent.addClass('active') }, doneTypingInterval);

				wave.addClass('animating');
			});

			$('.ripple').on('mouseup', function (e) {
				clearTimeout(trasholder);

				$this = $(this);
				$this.removeClass('active')
				$this.removeClass('pressed');
				var wave = $this.children('.waves');
				wave.fadeOut(300, function (){
					wave.remove();
				});

			});
		}
	},

	util : {
		newHash: function (L){
			if(!isset(L)) L = 10;
		    var s= '';
		    var randomchar=function(){
		    	var n= Math.floor(Math.random()*62);
		    	if(n<10) return n; //1-10
		    	if(n<36) return String.fromCharCode(n+55); //A-Z
		    	return String.fromCharCode(n+61); //a-z
		    }
		    while(s.length< L) s+= randomchar();
		    return s;
		}
	}

}

var Main = new Main();