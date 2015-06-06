app.extend(baseComponent, 'View', {
	init: function (options) {

		if(!isset(options)) options = {}

		this.id = 'view';
		this.root = true;
		this.html = '<view></view>';
		this.dom  = $(this.html);
		this.css = {
			backgroundColor: '#333',
			outline: 'none',
			color: '#333',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			position: 'absolute'
		};

		for(var property in options){
			if(property == "css") {
				for(var p in options.css){
					this.css[p] = options.css[p];
				}
			}else{
				this[property] = options[property];
			}
		}

		if(isset(this.id)){
			this.dom.attr('id', this.id);
		}

		if(isset(this.label)) {
			this.dom.append(this.label);
		}

		var style = (this.css) ? this.css : undefined;

		if(isset(style)){
			for (var property in style) {
				this.dom.css(property, style[property]);
			}
		}

		(isset(this.target)) ? this.dom.appendTo($(this.target)) : this.dom.appendTo('body');

		$(this.render()).appendTo(this.dom)

	}
});