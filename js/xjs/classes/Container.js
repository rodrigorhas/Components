function Container (options) {
	this.options = options;

	this.init();
}

Container.extend(BaseComponent);

Container.prototype.html = '<div class="container"></div>';