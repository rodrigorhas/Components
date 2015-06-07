function Input(options){	
	this.options = options;
	
	if(isset(this.init)) this.init({
		before: true
	});
}

Input.extend(BaseComponent);

Input.prototype.html = '<input class="input" type="text" />';
Input.prototype.type = '';
Input.prototype.before = function (dom) {
	if(this.placeholder)
		dom.attr('placeholder', this.placeholder)

	return dom;
}