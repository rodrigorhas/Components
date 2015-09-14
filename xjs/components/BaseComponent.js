function BaseComponent () {
	this.id = Hash();

	this.registerAsComponent ();
}

BaseComponent.prototype.init = function () {}

BaseComponent.prototype._configListeners = function ( dom ) {

	this.ondblclick = new Event();
	this.onclick = new Event();
	this.onmouseover = new Event();
	this.onmouseleave = new Event();
	this.onmousedown = new Event();
	this.onmouseup = new Event();
	this.ondisable = new Event();
	this.onenable = new Event();
	this.onshow = new Event();
	this.onhide = new Event();
	this.onchange = new Event();
	this.onrender = new Event();
	this.ondestroy = new Event();
	this.onbefore = new Event();
	this.onhover = new Event();
	this.onmousemove = new Event();

	dom.on('dblclick', function (e) { this.ondblclick.trigger(e, dom) }.bind(this));
	dom.on('click', function (e) { this.onclick.trigger(e, dom) }.bind(this));
	dom.on('mouseover', function (e) { this.onmouseover.trigger(e, dom) }.bind(this));
	dom.on('mouseleave', function (e) { this.onmouseleave.trigger(e, dom) }.bind(this));
	dom.on('mousedown', function (e) { this.onmousedown.trigger(e, dom) }.bind(this));
	dom.on('mouseup', function (e) { this.onmouseup.trigger(e, dom) }.bind(this));
	dom.on('disable', function (e) { this.ondisable.trigger(e, dom) }.bind(this));
	dom.on('able', function (e) { this.onable.trigger(e, dom) }.bind(this));
	dom.on('show', function (e) { this.onshow.trigger(e, dom) }.bind(this));
	dom.on('hide', function (e) { this.onhide.trigger(e, dom) }.bind(this));
	dom.on('change', function (e) { this.onchange.trigger(e, dom) }.bind(this));
	dom.on('render', function (e) { this.onrender.trigger(e, dom) }.bind(this));
	dom.on('destroy', function (e) { this.ondestroy.trigger(e, dom) }.bind(this));
	dom.on('before', function (e) { this.onbefore.trigger(e, dom) }.bind(this));
	dom.on('hover', function (e) { this.onhover.trigger(e, dom) }.bind(this));
	dom.on('mousemove', function (e) { this.onmousemove.trigger(e, dom) }.bind(this));
}

BaseComponent.prototype.render = function (target) {

	this._configListeners (this._dom);

	this.init(this);

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