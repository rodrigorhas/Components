BaseComponent.prototype.html = '<div></div>';

BaseComponent.prototype.init = function (run) {

	var __this = this;

	for(var property in this.options){
		this[property] = this.options[property];
	}

	var dom = $(this.html);

	// Create a new hash and attach to this component
	this.id = X.newHash(10);
	dom.attr('id', this.id);

	if(isset(run) && isset(run.before))
		dom = (isset(this.before(dom))) ? this.before(dom) : dom;

	if(this.type)
		dom.attr(this.type, '');

	if(this.state)
		dom.attr(this.state, '');

	if(this.label)
		dom.append(this.label);

	if(this.class)
		dom.addClass(this.class);

	if(this.style)
		dom.attr('style', this.style);

	if(this.layout)
		dom.addClass(this.layout);

	if(this.bind && this.bind.name)
		dom.attr('bind', 'value:' + this.bind.name);

	if(this.bind && this.bind.to)
		dom.attr('bind', 'textContent:' + this.bind.to);

	$(document).on('x-render', function (){
		var b = window.X.bindings;
		var id = __this.id;
		var bind = __this.bind;

		var name = (isset(bind) && isset(bind.name)) ? bind.name : false;
		var value = (isset(bind) && isset(bind.value)) ? bind.value : false;
		var to = (isset(bind) && isset(bind.to)) ? bind.to : false;

			if(name){

				X.bind(id, value);
				b[name] = bind;
				console.log(b);

			}else if (to){
				
				var res;
				for (var prop in b) {
					console.log('log');
					if(b[prop].name == to){
						res = b[prop].value;
						break;
					}
				};

				X.bind(id, res);
			}
	});

	if(isset(run) && isset(run.during))
		dom = (isset(this.during(dom))) ? this.during(dom) : dom;

	if(this.items) {
		if(this.renderTo){
			for (var i = 0; i < this.items.length; i++) {
				dom.find(this.renderTo).append(this.items[i].html);
			}
		}else{
			for (var i = 0; i < this.items.length; i++) {
				dom.append(this.items[i].html);
			}
		}

	}

	this.html = dom;

	if(this.listen) this.setListeners(dom, this.listen)

	if(isset(run) && isset(run.after))
		dom = (isset(this.after(dom))) ? this.after(dom) : dom;

	return this.html;
};

BaseComponent.prototype.setListeners = function (dom, listen) {
	if(listen){
		for(var l in listen) {
			dom.on(l, function(e){
				e.stopPropagation();
				listen[l](e, $(e.target));
			});
		}
	}
};

BaseComponent.prototype.before = function (dom) {};
BaseComponent.prototype.during = function (dom) {};
BaseComponent.prototype.after = function (dom) {};

BaseComponent.prototype.returnDom = function () { return this.html; };
BaseComponent.prototype.returnOpts = function (){ return this.options; }

function BaseComponent (xtype, options) {
	this.xtype = xtype;
	this.options = options;	
}