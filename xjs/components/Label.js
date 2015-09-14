function Label (options) {

	this._config(options);
	this._dom = $('<span></span>');
	this._dom.attr('id', this.id);

}

Label.extend(BaseComponent);