function Card (options) {
	this.options = options;

	if(isset(this.init)) this.init({
		during: true
	});
}

Card.extend(BaseComponent);

Card.prototype.html = '<div class="card"></div>';
Card.prototype.during = function (dom) {
	if(this.title){
		dom.prepend('<div class="card-header">'+ this.title +'</div>');
	}

	if(this.items) {
		dom.append('<div class="card-body"></div>');
		
		for (var i = 0; i < this.items.length; i++) {
			dom.find('.card-body').append(this.items[i].html);
		}
	}

	if(this.footer) {
		dom.append('<div class="card-footer"></div>');
		
		for (var i = 0; i < this.footer.length; i++) {
			dom.find('.card-footer').append(this.footer[i].html);
		}
	}

	this.html = dom;
	this.items = undefined;
}