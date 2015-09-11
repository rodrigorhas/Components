function Button(options){

	this.label = 'Default';
	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<button class="btn ripple"></button>');
	this._dom.attr('id', this.id);

	if(this.label) this._dom.append(this.label);
	if(this.raised && this.raised == true)	this._dom.attr('raised','');
	if(this.size) this._dom.addClass(this.size)


	// event attachs
	this.configListeners();

	this.registerAsComponent();
}

Button.extend(BaseComponent);