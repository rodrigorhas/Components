function Toolbar(options){

	this._config(options);
	this._dom = $('<div class="toolbar"></div>');
	this._dom.attr('id', this.id);

	if(this.size) this._dom.addClass(this.size)
}

Toolbar.extend(BaseComponent);