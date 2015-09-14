function Router (options) {
	this._routes = (options.when) ? options.when : false;
	
	this._routeParams = {};

	if(options.init) {
		this._routes.unshift(options.init);
		this._initialRoute = options.init;
	} else {
		this._initialRoute = false;
	}

	this._defaultRoute = (options.otherwise) ? this.find(options.otherwise) : false;
}

Router.prototype = {
	init : function () {
		console.info('router ready');
		var _this = this;

		this.transformRouteNames();

		if(this._initialRoute) {
			this.setRoute(this._initialRoute);
		}

		Main.routerReady = true;
	},

	setRoute : function (obj, forceHide) {

		if(!obj.routeName) throw new Error('Missing routeName parameter');
		if(!obj.controller) throw new Error('Missing controller parameter');

		var hash = obj.routeName;
		var controller = obj.controller;
		var c = Main.controllers[controller];

		if(c && !c._initialized) {
			window.location.hash = hash;
			c.init(forceHide);

		} else if(c && c._initialized) {
			window.location.hash = hash;
			Main.hideAllViews(c._view);
		} else {
			throw new Error('Cannot reach current route controller');
		}

	},

	find : function (string) {
		var result = false;

		for (var i = 0; i < this._routes.length; i++) {
			var route = this._routes[i];
			if(route.routeName == string) {
				result = route;
			}
		};

		return result;
	},

	go : function (controllerName, forceHide) {

		var result = this.find(controllerName);

		if(!result) {
			this.setRoute(this._defaultRoute, forceHide);
		} else {
			this.setRoute(result, forceHide);
		}
	},

	transformRouteNames : function (callback) {
		var i = (this._initialRoute) ? i = 1 : i = 0;
		//var reg = /(#\/\w*)(\/:\w*)+/;

		for (i; i < this._routes.length; i++) {
			var route = this._routes[i];
			var rn = route.routeName;
			var rp = route.params;

			if(rp) {
				var rps = rp.split('/:');

				var rpo = this._routeParams[rn] = {};

				for (var i = 1; i < rps.length; i++) {
					rpo[rps[i]] = rps[i];
				};

			}

			var s = rn.split('/');
			if(s[0] == rn){
				rn = '/' + rn;
			} else if(s[0] != ""){
				throw new Error('Type Error (routeName) : Router => when => ' + rn)
			}

			if(callback && typeof callback == "function") callback();
		};
	}
}