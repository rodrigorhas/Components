function Toolbar (options) {
	this.options = options;

	this.init({
		before: true
	});
}

Toolbar.extend(BaseComponent);

Toolbar.prototype.html = '<div class="toolbar"></div>';
Toolbar.prototype.before = function (dom) {
	if(this.options.items) {
		for (var i = 0; i < this.options.items.length; i++) {
			var item = this.options.items[i];

			var name = item.constructor.name;

			if(name == 'Button') {
				this.class = 'min'
			}

		};
	}
}