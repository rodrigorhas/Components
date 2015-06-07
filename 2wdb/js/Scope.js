function Scope () {
}

Scope.prototype = {
	$$watch : function () {
		Object.observe(this, function (c) {
			Model.apply(c);
		})
	}
}

$scope = new Scope();