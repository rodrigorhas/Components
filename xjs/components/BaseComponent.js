function BaseComponent () {
	this.id = Hash();

	this.registerAsComponent ();

	//this._initListeners ();
}

BaseComponent.prototype.customize = function () {}

/*BaseComponent.prototype._initListeners = function () {

	console.log(this);

	this._dom.on('dblclick', function (e) { this.ondblclick.trigger(e, this._dom) }.bind(this));
	this._dom.on('click', function (e) { this.onclick.trigger(e, this._dom) }.bind(this));
	this._dom.on('mouseover', function (e) { this.onmouseover.trigger(e, this._dom) }.bind(this));
	this._dom.on('mouseleave', function (e) { this.onmouseleave.trigger(e, this._dom) }.bind(this));
	this._dom.on('mousedown', function (e) { this.onmousedown.trigger(e, this._dom) }.bind(this));
	this._dom.on('mouseup', function (e) { this.onmouseup.trigger(e, this._dom) }.bind(this));
	this._dom.on('disable', function (e) { this.ondisable.trigger(e, this._dom) }.bind(this));
	this._dom.on('able', function (e) { this.onable.trigger(e, this._dom) }.bind(this));
	this._dom.on('show', function (e) { this.onshow.trigger(e, this._dom) }.bind(this));
	this._dom.on('hide', function (e) { this.onhide.trigger(e, this._dom) }.bind(this));
	this._dom.on('change', function (e) { this.onchange.trigger(e, this._dom) }.bind(this));
	this._dom.on('render', function (e) { this.onrender.trigger(e, this._dom) }.bind(this));
	this._dom.on('destroy', function (e) { this.ondestroy.trigger(e, this._dom) }.bind(this));
	this._dom.on('before', function (e) { this.onbefore.trigger(e, this._dom) }.bind(this));
	this._dom.on('hover', function (e) { this.onhover.trigger(e, this._dom) }.bind(this));
	this._dom.on('mousemove', function (e) { this.onmousemove.trigger(e, this._dom) }.bind(this));
}*/

BaseComponent.prototype.render = function (target) {
	
	this.customize(this);

	this.target = (target) ? target : this.target;

	if(this.target) {
		$(this.target).append(this._dom);
	}

	else {
		throw new Error('Target not set');
	}
	
	return this;
}

BaseComponent.prototype.up = function (target) {
	var el = (!target) ? this._dom.parent() : this._dom.parents(target);
	
	if (el && el.attr('id')) {
		var elementID = el.attr('id');

		if(elementID) return Main.query(elementID);
	}

	return null;
}

BaseComponent.prototype.down = function (target) {
	var el = (!target) ? this._dom.children() : this._dom.find(target);

	if (el && el.attr('id')) {
		var elementID = el.attr('id');

		if(elementID) return Main.query(elementID);
	}

	return null;
}

BaseComponent.prototype.registerAsComponent = function () {
	if(!window.Main) window.Main = {};
	if(!window.Main.components) window.Main.components = {};

	window.Main.components[this.id] = this;
}

BaseComponent.prototype._config = function ( options ) {
	for (var property in options) {
		this[property] = options[property];
	}
}

BaseComponent.prototype.ondblclick   = new Event();
BaseComponent.prototype.onclick      = new Event();
BaseComponent.prototype.onmouseover  = new Event();
BaseComponent.prototype.onmouseleave = new Event();
BaseComponent.prototype.onmousedown  = new Event();
BaseComponent.prototype.onmouseup    = new Event();
BaseComponent.prototype.ondisable    = new Event();
BaseComponent.prototype.onable       = new Event();
BaseComponent.prototype.onshow       = new Event();
BaseComponent.prototype.onhide       = new Event();
BaseComponent.prototype.onchange     = new Event();
BaseComponent.prototype.onrender     = new Event();
BaseComponent.prototype.ondestroy    = new Event();
BaseComponent.prototype.onbefore     = new Event();
BaseComponent.prototype.onhover      = new Event();
BaseComponent.prototype.onmousemove  = new Event();