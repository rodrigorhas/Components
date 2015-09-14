/*Toolbar.prototype.before = function (dom) {
	if(this.options.items) {
		for (var i = 0; i < this.options.items.length; i++) {
			var item = this.options.items[i];

			var name = item.constructor.name;

			if(name == 'Button') {
				this.class = 'min'
			}

		};
	}
}*/

function Toolbar(options){

	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<div class="toolbar"></div>');
	this._dom.attr('id', this.id);

	if(this.size) {
		this._dom.addClass(this.size)
	}

	// event attachs
	this.configListeners();

	this.registerAsComponent();
}

Toolbar.extend(BaseComponent);