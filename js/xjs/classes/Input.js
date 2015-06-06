function Input(options){	
	this.options = options;
	
	if(isset(this.init)) this.init();
}

Input.extend(BaseComponent);

Input.prototype.html = '<input type="text" />';
Input.prototype.type = '';