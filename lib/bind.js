function Scope (scope, binds) {
	this.scope = scope || {};
	this.binds = binds || {};

	this.init ();

	return this.scope;
}

Scope.prototype.init = function () {
	var $this = this;

	/*
		Recursive observe
	*/

	var $path = "";

	function watch ( node, path, fn) {

		if(!node) {
			console.error("No object to bind");
			return;
		}

		Object.observe(node, function (changes) {

			for ( i in changes ) {
				var change = changes[i]
				var key = change.name;

				if(isFunction (fn)) {
					fn(change.object[key], change.oldValue, node, key, change);
				}
			}
		});

		for (var property in node) {
			if (isObject(node[property], true)) {
				path = (path.length) ? path + "." + property : property;
				watch(node[property], path, fn);
			}

			else {
				var p = (path.length) ? path + "." + property : property;
				ViewUpdater (node[property], null, null, p, null);
			}
		}
	}

	/*
		The scope
	*/

	var ViewUpdater = function (newVal, oldVal, data, key, change) {

		var binds = this.binds,
			selector;

		for (var i in binds) {
			var bind = binds[i];

			// validate the bind string
			if ( bind == key ) {
				selector = $(i);
			}

			else if ( bind.indexOf('.') > -1 ) {

				var keys = bind.split('.'),
					cp = this.scope,
					kl = keys.length - 1;

				for ( var k in keys ) {
					var prop = keys[k];

					if ( cp.hasOwnProperty(prop) ) {
						// if last
						if (kl == k) {
							// if key exits on path
							if ( prop == key ) {
								selector = $(i);
								break;
							}
						}

						// else keep crawlling
						else {
							cp = cp[prop];
						}
					}

					else {
						return console.error('Property not found -> ' + prop);
					}
				}
			}

			// finally
			if (selector && selector.length) {

				setValue (selector)

			} else if ( selector && selector.length == 0 ){

				window.onload = function () {
					setValue($(selector.selector));
				}

			}

			function setValue (s) {
				if( s.is("input") ) {
					s.val(newVal);
				}
			}
		}

	}.bind(this);

	/*
		The magic
	*/

	watch(this.scope, $path, ViewUpdater);

}

var data = {
	a: "freak man",
	b: "blue ?",
	c: {
		d: "How high are u bro ?",
		e: "hehehehhe",
		f: {
			g: 17
		}
	}
}

var scope = new Scope (data, {
	".input" : "c.d",
	"#new" : "a"
});