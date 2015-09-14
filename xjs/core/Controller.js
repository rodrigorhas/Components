function Controller (options) {
	this._initialized = false;
	this._model = Main.models[options.model];

	if(!Main.views[options.view]){
		throw new Error('View not found => ' + options.view);
	} else {
		this._view = Main.views[options.view];
	}

    this.ready = options.ready;

    if(typeof Main.router == 'function') { // if is set
    	this.init();
    }

}

Controller.prototype = {
	init : function (forceClear) {
		this._initialized = true;
		this._view.init(forceClear); // init view
		this.ready(this._view._elements, this._view, this._model); // [controller] => onready  ( [view] )
	}
}