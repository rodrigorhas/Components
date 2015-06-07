function Scope (controller) {
	this.controller = controller;
}

Scope.prototype = {
	$$watch : function () {
		var __this = this;
		Object.observe(this, function (c) {
			Model.apply(c, __this.controller);
		})
	}
}