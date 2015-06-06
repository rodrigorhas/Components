function Class(){
  return function(args){
    if ( this instanceof arguments.callee ) {
      if ( typeof this.init == "function" )
        this.init.apply( this, args.callee ? args : arguments );
      if ( typeof this.initialize == "function" )
        this.initialize.apply( this, args.callee ? args : arguments );
    } else
      return new arguments.callee( arguments );
  };
}

function isset (t) { return ( t != undefined && t != null && t != "" ) ? true : false; }

var Proto = Class();

Proto.prototype = {
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

		for(var property in options){
			this[property] = options[property];
		}

		this.requires.unshift('View')

		if(isset(this.requires)){
			var count = 0;
			
			$this = this;

			for (var i = 0; i < this.requires.length; i++) {
				this.loadScript('js/protojs/classes/' + this.requires[i] + '.js', function(error){
					if(error.type == 'error') return console.error('Dependencia nao encontrada => ' + error.target.src );

					count++;
					if(count == $this.requires.length){
						$(document).trigger('onProtoLoad');
					}
				});
			};
		}
	}
}

var baseComponent = Class();

baseComponent.prototype = {
	items: [],
	html: '<div></div>',
	text: '',

	initialize: function () {
        for (var i = 0; i < this.items.length; i++) {
	        var p = this.items[i];
	        for (var j = 0; j < p.items.length; j++) {
	            p.items[j].parent = p;
	        }
	    }
    },

	render: function (node, parentId) {

		if(!isset(node)) node = this.items;
		
		for (var i = 0; i < node.length; i++) {

			if(isset(node[i].items)){ // se tiver filhos
				if(node[i].items.length > 0 ) { // se tiver filhos mesmo

					for (var u = 0; u < node[i].items.length; u++) { // faz a relaçao parent -> child, passa por cada filho a adiciona o pai
						if(u == 1){
							node[i].parent = this.options; // se for o primeiro, adiciona o parent do view
						}else{
							node[i].items[u].parent = node[i].options;
						}
					};

					this.render(node[i].items, node[i].parent);
				}
			}

			if(isset(parentId)) {
				this.text += window[node[i].type](node[i].options, node[i].parent).init()
				console.log(node[i].parent, node[i].type);
			}else{
				console.log(node[i].parent, node[i].type);
				this.text += window[node[i].type](node[i].options, node[i].parent).init()
			}

		};

		return this.text;
	}
}