function Viewport (options) {
	this.html = '<div class="view"></div>';
	this.options = options;

	this.init();
}

Viewport.extend(BaseComponent);

Viewport.prototype.init = function () {
		
	console.debug('Viewport Initialized');

	for(var property in this.options){
		this[property] = this.options[property];
	}

	var dom = $(this.html);
	if(this.items) {

		for (var i = 0; i < this.items.length; i++) {
			dom.append(this.items[i].html);
		};

		this.html = dom;
	}

	dom.appendTo($('body'));

	$(document).trigger('x-render')

	if(dom.find('.btn').length > 0){
		X.effects.loadRipple();
	}
}