function View () {}

View.prototype = {
	apply : function (c, controller) {
		var m = Inspector.matches; // matches of inspector

		for (var i = 0; i < m.length; i++) {

			var mi = controller.find('[x-model="' +c[0].name+ '"]:input');
			var mt = controller.find('[x-bind="' +c[0].name+ '"]:input');
			var mt2 = controller.find('[x-bind="' +c[0].name+ '"]');


			if(mi.val() != c[0].object[c[0].name]) mi.val(c[0].object[c[0].name]);
			if(mt.val() != c[0].object[c[0].name]) mt.val(c[0].object[c[0].name]);
			if(mt.text() != c[0].object[c[0].name]) mt2.text(c[0].object[c[0].name]);

		};
	}
}

var View = new View();