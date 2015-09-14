function Container (options) {

	this._id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<div class="container"></div>');
	this._dom.attr('id', this._id)
}

Container.prototype = {
	render : function (target) {
		if(!target) {
			$('#container').append(this._dom);
		} else {
			$(target).append(this._dom);
		}

		return this;
	}
}