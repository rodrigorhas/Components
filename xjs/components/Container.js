function Container (options) {

	this._config(options);
	this._dom = $('<div class="Container"></div>');
	this._dom.attr('id', this._id)
}

Container.prototype = {
	render : function (target) { 
		target = (!target) ? '#container' : target;
		$(target).append(this._dom);

		return this;
	}
}

Container.extend(BaseComponent);