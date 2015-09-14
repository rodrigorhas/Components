function Input(options){

	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<input class="input" type="text" />');
	this._dom.attr('id', this.id);

	if(this.emptyText)
		this._dom.attr('placeholder', this.emptyText);

	console.log(this);

	// event attachs
	this.configListeners();

	this.registerAsComponent();
}

Input.extend(BaseComponent);

Input.prototype.getText = function () {
	return this._dom.val()
}

Input.prototype.setText = function (value) {
	this._dom.val(value);
}

Input.prototype.clearText = function () {
	this._dom.val('');
}