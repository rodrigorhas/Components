var Toolbar = Class();

Toolbar.prototype = {
	init: function (options, parent) {

		//if(!isset(options)) return console.error('Init dupes')

		this.html = "<toolbar></toolbar>";
		this.dom  = $(this.html);
		this.css = {
			backgroundColor: '#f2f2f2',
			outline: 'none',
			color: '#333',
			padding: '16px',
			boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
			position: 'absolute',
			left: 0,
			right: 0,
			backgroundColor: 'rgb(242, 242, 242)',
			fontSize: '18px',
			fontWeight: '400',
			color: 'rgb(100, 100, 100)'
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