function Viewport(options){

	for (var property in options) {
		this[property] = options[property];
	}

	this._dom = $('<div id="viewport"></div>');

	// event attachs
	this.configListeners();

	this.registerAsComponent();
}

Viewport.extend(BaseComponent);