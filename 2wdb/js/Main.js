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

	}

}

var Main = new Main();