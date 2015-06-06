function Label (options) {
	this.options = options;

	if(isset(this.init)) this.init();
}

Label.extend(BaseComponent);

Label.prototype.html = '<span></span>';