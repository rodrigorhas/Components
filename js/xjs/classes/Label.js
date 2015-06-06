function Label (options) {
	this.options = options;

	this.init();
}

Label.extend(BaseComponent);

Label.prototype.html = '<span></span>';