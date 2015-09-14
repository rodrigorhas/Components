function Viewport (options) {

	this._config(options);
	this._dom = $('<div id="viewport" class="view"></div>');

	this.init();
}

Viewport.extend(BaseComponent);

Viewport.prototype.init = function () {
		
	console.debug('Viewport Initialized');

	this._dom.appendTo($('body'));

	if(this._dom.find('.btn').length > 0){
		Main.effects.loadRipple();
	}
}