function Grid(options){	
	this.options = options;
	
	if(isset(this.init)) this.init();
}

Grid.extend(BaseComponent);

Grid.prototype.html = '<div class="Grid"></div>';