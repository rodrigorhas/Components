function Viewport(options){

	this._config(options);

	this._dom = $('<div id="viewport"></div>');
}

Viewport.extend(BaseComponent);