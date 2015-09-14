function Button(options){

	this.label = 'Default';
	this._config(options);

	this._dom = $('<button class="btn ripple"></button>');
	this._dom.attr('id', this.id);

	if(this.label) this._dom.append(this.label);
	if(this.raised && this.raised == true)	this._dom.attr('raised','');
	if(this.size) this._dom.addClass(this.size);

}

Button.extend(BaseComponent);