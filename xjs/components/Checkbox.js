function Checkbox(options){	

	this._config(options);

	this._dom = $('<input type="checkbox" />');
	this._dom.attr('id', this.id);
}

Checkbox.extend(BaseComponent);