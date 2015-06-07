/*function Model( uid ) {
  Inspector.match(uid)
  var binder = new DataBinder( uid ),

	  model = {
		attributes: {},

		// The attribute setter publish changes using the DataBinder PubSub
		set: function( attr_name, val ) {
		  this.attributes[ attr_name ] = val;
		  binder.trigger( uid + ":change", [ attr_name, val, this ] );
		},

		get: function( attr_name ) {
		  return this.attributes[ attr_name ];
		},

		_binder: binder
	  };

  // Subscribe to the PubSub
  binder.on( uid + ":change", function( evt, attr_name, new_val, initiator ) {
	if ( initiator !== model ) {
	  model.set( attr_name, new_val );
	}
  });

  console.log(window.b.i);
  window.b.i[uid] = model

  return model;
}*/

function Model () {

}

Model.prototype = {
	apply : function (c) {
		var m = Inspector.matches; // matches of inspector

		for (var i = 0; i < m.length; i++) { 

			var mi = $('[x-model="' +c[0].name+ '"]:input');
			var mt = $('[x-bind="' +c[0].name+ '"]');

			mi.val(c[0].object[c[0].name]);
			mt.text(c[0].object[c[0].name]);

		};
	}
}

var Model = new Model();