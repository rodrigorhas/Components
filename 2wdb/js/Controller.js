function Controller () {}

Controller.prototype = {
	new : function (name, fn) {
		var scp = Inspector.match(name);
		if(typeof scp == 'object'){
			scp.$$watch()
			fn(scp);
		}
	}
}

var Controller = new Controller();