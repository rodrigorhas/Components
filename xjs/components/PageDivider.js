function PageDivider(options){

	this.label = 'Divider';
	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<h3 class="page-divider"></h3>');
	this._dom.attr('id', this.id);

	if(this.label) this._dom.append(this.label);
	if(this.raised && this.raised == true)	this._dom.attr('raised','');


	// event attachs
	this.configListeners();

	this.registerAsComponent();
}

PageDivider.extend(BaseComponent);