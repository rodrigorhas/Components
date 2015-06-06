function x (options) {
	this.requires;
}

x.prototype = {

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
	},

	loadScript: function(url, callback){
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    script.onreadystatechange = callback;
	    script.onload = callback;
	    script.onerror = callback;
	    head.appendChild(script);
	},

	extend: function (parentClass, newClass, args) {
		

		var a = window[newClass]; // cria a funçao na window

		a = Class(); // usa o construtor Class pra quando tiver init ele ja inicia

		a.prototype = parentClass.prototype; // copia o prototype para a funçao atual

		for (var property in args) { // para cada argumento, copia ele para o prototype da funçao
			a.prototype[property] = args[property];
		}

		window[newClass] = a; // e da um apply re-instanciando a funçao na window

	},

	init: function (options) {

		$scope = window.X.bindings = {};

		for(var property in options){
			this[property] = options[property];
		}

		this.requires.unshift('Brackets');
		this.requires.unshift('Factory');
		this.requires.unshift('baseComponent');

		if(isset(this.requires)){
			var count = 1;
			
			$this = this;

			this.loadScript('js/xjs/classes/' + this.requires[0] + '.js', function(error){

				for (var i = 1; i < $this.requires.length; i++) {
					$this.loadScript('js/xjs/classes/' + $this.requires[i] + '.js', function(error){
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

	bind: function (domElement, obj) {
		domElement = document.getElementById(domElement);

	    var bind = domElement.getAttribute("bind").split(":");
	    var domAttr = bind[0].trim();
	    var itemAttr = bind[1].trim();

	    Object.observe(obj, function (change) {
	        domElement[domAttr] = obj[itemAttr];
	    });
	    new MutationObserver(updateObj).observe(domElement, {
	        attributes: true,
	        childList: true,
	        characterData: true
	    });
	    domElement.addEventListener("keyup", updateObj);
	    domElement.addEventListener("click",updateObj);
	    function updateObj(){
	        obj[itemAttr] = domElement[domAttr];   
	    }
	    domElement[domAttr] = obj[itemAttr];
	}
}

var X = new x();