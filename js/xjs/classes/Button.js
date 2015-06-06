function Button(options){	
	this.options = options;
	
	if(isset(this.init)) this.init({
		before: true
	});
}

Button.extend(BaseComponent);

Button.prototype.html = '<button class="btn ripple"></button>';
Button.prototype.type = '';

Button.prototype.before = function (dom) {
	if(isset(this.options.refId)){
		this.refId = this.options.refId
	}
}