BaseComponent.prototype.customize = function () {}

BaseComponent.prototype.render = function (target) {
	
	this.customize(this);

	//console.log(this.target);

	if(this.target) {
		$(target).append(this._dom);
		return this;
	}

	if(target) {
		$(target).append(this._dom);
	} else {
		throw new Error('Target not set');
	}
	return this;
}

BaseComponent.prototype.up = function (target) {
	var el;
	if(!target) {
		el = this._dom.parent();
	} else {
		el = this._dom.parents(target);
	}
	
	//if(el.length > 1) throw new Error('Be more expecified => ' + this.xtype + ' => up method')
	if (el && el.attr('id')) {
		var elementID = el.attr('id');

		if(elementID) return Main.query(elementID);
	}

	return false;
}

BaseComponent.prototype.down = function (target) {
	var el;
	if(!target) {
		el = this._dom.children();
	} else {
		el = this._dom.find(target);
	}

	//if(el.length > 1) throw new Error('Be more expecified => ' + this.xtype + ' => down method')
	if (el && el.attr('id')) {
		var elementID = el.attr('id');

		if(elementID) return Main.query(elementID);
	}

	return false;
}

BaseComponent.prototype.registerAsComponent = function () {
	if(!window.Main) window.Main = {};
	if(!window.Main.components) window.Main.components = {};
	window.Main.components[this.id] = this;
}

BaseComponent.prototype.configListeners = function () {
	this.ondblclick = new Event();
	this.onclick = new Event();

	this.onhover = new Event();
	this.onmousemove = new Event();
	
	this.onmouseover = new Event();
	this.onmouseleave = new Event();

	this.onmousedown = new Event();
	this.onmouseup = new Event();

	this.ondisable = new Event();
	this.onable = new Event();

	this.onshow = new Event();
	this.onhide = new Event();

	this.onchange = new Event();

	this.onrender = new Event();
	this.ondestroy = new Event();

	this.onbefore = new Event();
}

function BaseComponent () {}