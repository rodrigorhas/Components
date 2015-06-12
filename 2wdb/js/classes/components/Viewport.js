function Viewport (options) {
	this.html = '<div class="view"></div>';
	this.options = options;

	if(isset(this.init)) this.init();
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

	if(this.controller) {
		var c = this.controller;

		var cs = "";
		for (var i = 0; i < c.length; i++) {
			if(i == 0 && c.length == 1) {
				cs = c[i];
			} else if (i == 0 && c.length > 1 && i != c.length-1 ){
				cs += c[i] + ":";
			} else if(i == c.length -1) {
				cs += c[i];
			}
		};

		dom.attr('x-controller', cs)
	}

	dom.appendTo($('body'));

	$(document).trigger('x-render');

	if(dom.find('.btn').length > 0){
		Main.effects.loadRipple();
	}
}