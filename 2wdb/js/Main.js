function Main () {

}

Main.prototype = {
	controller: function (name, config, fn) {

	},

	model : function (name, object) {

		if ( !isset(window['Model']) ) window['Model'] = {}

		var fn = new Function(object.id, object.values,
		'return function ' + name + '(id, values){\
			this.id = id;\
			this.fields = '+ JSON.stringify(object.fields) +';\
			this.values = values;\
			return {id: this.id, fields: this.fields, values: this.values};\
		}');

		var newFn = fn();

		newFn.extend(Model)

		window.Model[name] = newFn;

	}
}

var Main = new Main();