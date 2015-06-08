function Controller () {}

Controller.prototype = {
	new : function (name, config, fn) {
		if( isset(config) && isset(config.stores) ){
			var stores = {};

			if(config.stores.length > 1 ){
				for (var i = 0; i < config.stores.length; i++) {
					var name = config.stores[i];
					stores[name] = Stores.get(name);
				};
			} else {
				stores = Stores.get(config.stores[0]);
			}
		}

		if(!window.Model) window.Model = {};
		var scp = Inspector.match(name);
		if(typeof scp == 'object'){
			fn(scp, stores);
		}
	}
}

var Controller = new Controller();