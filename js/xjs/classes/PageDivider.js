function PageDivider(options){	
	this.options = options;
	
	if(isset(this.init)) this.init();
}

PageDivider.extend(BaseComponent);

PageDivider.prototype.html = '<h3 class="page-divider"></h3>';
PageDivider.prototype.label = 'Divider';