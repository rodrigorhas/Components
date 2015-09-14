function Grid(options){	

	this._config(options);
	this._dom = $('<div class="Grid"></div>');
	this._dom.attr('id', this._id);
}

Grid.extend(BaseComponent);