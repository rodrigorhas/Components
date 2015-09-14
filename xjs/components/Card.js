function Card(options){

	this.label = 'Default';
	this._config(options);

	this._dom = $('<div class="card"></div>');
	this._dom.attr('id', this.id);

	this._checkStructure();
}

Card.extend(BaseComponent);

Card.prototype._checkStructure = function (dom) {
	if(this.title){
		this._dom.prepend('<div class="card-header">'+ this.title +'</div>');
	}

	if(this.items) {
		this._dom.append('<div class="card-body"></div>');
		
	}

	if(this.footer) {
		this._dom.append('<div class="card-footer"></div>');
		
		for (var i = 0; i < this.footer.length; i++) {
			this._dom.find('.card-footer').append(this.footer[i].html);
		}
	}
}