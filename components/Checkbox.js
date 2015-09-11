function Checkbox(options){	
	this.options = options;
	
	if(isset(this.init)) this.init();
}

Checkbox.extend(BaseComponent);

Checkbox.prototype.html = '<input type="checkbox" />';
Checkbox.prototype.type = '';