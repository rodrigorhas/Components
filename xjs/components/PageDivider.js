function PageDivider(options){

	this.label = 'Divider';
	this._config(options);
	this._dom = $('<h3 class="page-divider"></h3>');
	this._dom.attr('id', this.id);

	if(this.label) this._dom.append(this.label);
	if(this.raised && this.raised == true)	this._dom.attr('raised','');
}

PageDivider.extend(BaseComponent);