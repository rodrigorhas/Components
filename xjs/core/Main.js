(function () {

	function Main () {
		this.models = {}
		this.views = {}
		this.controllers = {}
		this.hasRouter = false;
		this.routerReady = false;
	}

	Main.prototype = {

		model : function (name, object) {

			if(!object) object = {fields: []};
			if(!name) throw Error('Missing model name => Main.model(<name>, <config>)');
			if(typeof name != "string") throw new Error('Model name isn\'t a string');
			if(typeof object != "object") throw new Error('Model config isn\'t a object');

			var fn = new Function(object.id,
			'return function ' + name + '(id, values){\
				this.id = id;\
				this.fields = '+ JSON.stringify(object.fields) +';\
				this.values = values;\
				return {id: this.id, fields: this.fields, values: this.values};\
			}');

			var newFn = fn();

			newFn.extend(Model)

			this.models[name] = newFn;
		},

		create : function (name, object) {
			if(!name) throw Error('Missing Class name => Main.create(<name>, <config>)');
			if(typeof name != "string") throw new Error('Class name isn\'t a string');
			if(typeof object != "object") throw new Error('Class config isn\'t a object');

			var dmo = (object.prototype._dom) ? object.prototype._dom : '';

			var fn = new Function(
			'return function ' + name + '(options){\
				this._config(options);\
				this._dom = $(\''+object.prototype._dom+'\');\
				this._dom.attr(\'id\', this.id);\
			}');

			var newFn = fn();

			var e = object.extend;
			if(!e) e = BaseComponent;

			newFn.extend(e);

			for (var p in object.prototype) {
				newFn.prototype[p] = object.prototype[p];
			}

			window[name] = newFn;

			return newFn;
		},

		view : function (args) {
			if(!args.name) throw new Error('Missing name property view');
			this.views[args.name] = new View(args);
		},

		viewport : function () {
			this.viewport = new Viewport().render('body');
		},

		controller : function (args) {
			if(!args.name) throw new Error('Missing name property controller');
			this.controllers[args.name] = new Controller(args);

			if(this.hasRouter && !this.routerReady) {
				this.router.init();
			}
		},

		router : function (args) {
			if(!args.when) throw new Error('Missing router config');
			this.router = new Router(args);
			this.hasRouter = true;
		},

		query : function (componentId) {
			if (componentId in window.Main.components) {
				return window.Main.components[componentId];
			}
			// else
			return false;
		},

		hideAllViews : function (el) {
			for (var view in this.views) {
				this.views[view].hideDom();
			}

			el.showDom();
		}

	}

	window.Main = new Main();

})();
