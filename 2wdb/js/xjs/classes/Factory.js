function Factory () {
	this.classes = {};
	this.components = [];
}

Factory.prototype.new = function (name, arguments){
	var obj = new(this.classes[name])(arguments);
	this.components.push(obj)

	return obj;
}

var factory = new Factory();