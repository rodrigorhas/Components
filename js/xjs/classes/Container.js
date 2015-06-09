function Container (options) {
	this.options = options;

	if(isset(this.init)) this.init();
}

Container.extend(BaseComponent);

Container.prototype.html = '<div class="container"></div>';