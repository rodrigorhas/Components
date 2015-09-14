function Card(options){

	this.label = 'Default';
	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<div class="card"></div>');
	this._dom.attr('id', this.id);

	// event attachs
	console.log(this);
	this.checkOptions();

	this.configListeners();

	this.registerAsComponent();
}

Card.extend(BaseComponent);

Card.prototype.checkOptions = function (dom) {
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

	//this.items = undefined
}