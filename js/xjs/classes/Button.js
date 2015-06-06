function Button(options){	
	this.options = options;
	
	if(isset(this.init)) this.init();
}

Button.extend(BaseComponent);

Button.prototype.html = '<button class="btn ripple"></button>';
Button.prototype.type = '';