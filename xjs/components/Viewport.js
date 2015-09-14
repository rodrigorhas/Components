function Viewport (options) {

	this._config(options);
	this._dom = $('<div id="viewport" class="view"></div>');

	console.debug('Viewport Initialized');

	this._dom.appendTo($('body'));

	if(this._dom.find('.btn').length > 0){
		Main.effects.loadRipple();
	}
}

Viewport.extend(BaseComponent);