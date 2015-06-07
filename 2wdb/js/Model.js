function Model () {}

Model.prototype = {
	apply : function (c, controller) {
		var m = Inspector.matches; // matches of inspector

		for (var i = 0; i < m.length; i++) { 

			var mi = controller.find('[x-model="' +c[0].name+ '"]:input');
			var mt = controller.find('[x-bind="' +c[0].name+ '"]');

			mi.val(c[0].object[c[0].name]);
			mt.text(c[0].object[c[0].name]);

		};
	}
}

var Model = new Model();