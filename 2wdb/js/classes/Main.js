function Main () {

}

Main.prototype = {
	controller: function (name, config, fn) {
		if( isset(config) && isset(config.stores) ){
			var stores = {};

			if(config.stores.length > 1 ){
				for (var i = 0; i < config.stores.length; i++) {
					var name = config.stores[i];
					stores[name] = Stores.get(name);
				};
			} else {
				stores = this.Stores.get(config.stores[0]);
			}
		}

		if(!window.Model) window.Model = {};
		var scp = Inspector.match(name);
		if(typeof scp == 'object'){
			fn(scp, stores);
		}
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
		$(document).on('x-ready', fn)
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

Main.application({
	requires: [
	'Viewport', 'Toolbar','Button', 'Card',
	'Container','Label', 'PageDivider',
	'TableGrid', 'Checkbox', 'Input', 'Window',
	'Grid', 'ShortcutToolbar'
	]
})