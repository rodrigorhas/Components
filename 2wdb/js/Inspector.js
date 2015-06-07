function Inspector () {}

Inspector.prototype = {
	match: function (controller) {

		if(!isset(controller)) return console.error('Attach a controller');

		var controllerObj = $('[x-controller="'+ controller +'"]');

		if(!controllerObj.length) return console.error('Controller -> ' + controller + ': not found !');

		this.matches = controllerObj.find('[x-model]:input'); // update matches on every call

		var $scope = new Scope(controllerObj);

		for (var i = 0; i < this.matches.length; i++) { // for each match
			var m = $(this.matches[i]); // allocate into a variable called m
			var ma = m.attr('x-model'); // and catch the attr [x-model]

			m.on('keyup keydown',function(event) {
				$scope[$(this).attr('x-model')] = $(this).val()
			});

			$scope[ma] = m.val();
		};

		return $scope;
	}
}

var Inspector = new Inspector();