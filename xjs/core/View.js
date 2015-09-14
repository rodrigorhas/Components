function View (options) {
	var _this = this;
	this._model = Main.models[options.model];
	this._id = options.name;
	this._dom = $('<div id="'+this._id+'"></div>');

	for (var property in options) {
		this[property] = options[property];
	}

	if(this.allowScroll && this.allowScroll == true){
		$('#viewport').addClass('scrollable')
	}

	this._items = this.items;
	delete this.items;
	this._elements = {};

	this.attachListeners = options.listeners;

}

View.prototype = {
	init : function (forceHide) {
		if(forceHide) {
			Main.hideAllViews(this);
		}
		return this.startRender(this.attachListeners);
	},

	createComponent : function (item) {
		var component = this.factory(item);
		this._elements[component.id] = component;
		return component;
	},

	recursiveCall : function (parent, dom) {
		for (var i = 0; i < parent.items.length; i++) {
			var item = parent.items[i];
			var el = this.createComponent(item);

			if(item.hasOwnProperty('target')) {
				el.render(item.target);
			} else {
				el.render(dom);
			}

			if(item.hasOwnProperty('items') && item.items.length > 0) {
				this.recursiveCall(item, el._dom)
			}
			
		};
	},

	startRender : function (callback) {
		this._dom.prependTo('#viewport');
		var defaultTaget = $('#' + this._id);
		var s = this._items;

		for (var i = 0; i < s.length; i++) {
			var item = s[i];

			if(!item.xtype) throw new Error('Missing xtype => ' + item._label );


			if(item.hasOwnProperty('items') && item.items.length > 0) {

				var t = this.createComponent(item);
				t.render(defaultTaget);

				if(item.hasOwnProperty('target')) {
					this.recursiveCall(item, item.target)
					console.log(item.target);
				} else {
					this.recursiveCall(item, t._dom)
				}

			} else {
				this.createComponent(item).render(defaultTaget);
			}
		};

		// render function finished, then pass this to callback function
		if(callback) return callback(this._elements);
	},

	factory : function (item) {

		// if this namespace doesn't exists, create !
		if ( !window['Components'] ) window['Components'] = []

		var fn = new Function(
		'var item = '+JSON.stringify(item)+
		'; return new ' + item.xtype + '(item)\
		');

		var component = fn();

		window.Components.push( component );

		return component;
	},

	hideDom : function () {
		this._dom.hide()
	},

	showDom : function () {
		this._dom.show()
	}
}