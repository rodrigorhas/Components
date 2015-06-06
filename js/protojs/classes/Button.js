var Button = Class();

Button.prototype = {
	init: function (options, parent) {

		if(!isset(options)) options = {}

		this.html = "<button></button>";
		this.dom  = $(this.html);
		this.css = {
			border: '1px solid #ccc',
			backgroundColor: '#f2f2f2',
			outline: 'none',
			color: '#333',
			padding: '8px 12px',
			borderRadius: '2px',
			cursor: 'pointer',
			margin: '0 16px'
		}

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

		if(isset(parent)) console.log(parent.id + '->' + this.id);

		if(isset(parent)) return $(this.dom).appendTo($(parent.id))

		return $(this.dom).prop('outerHTML');

	}
}