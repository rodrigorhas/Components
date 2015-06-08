function Inspector () {}

Inspector.prototype = {
	match: function (controller) {

		if(!isset(controller)) return console.error('Attach a controller');

		var controllerObj = $('[x-controller="'+ controller +'"]');

		if(!controllerObj.length) return console.error('Controller -> ' + controller + ': not found !');

		this.matches = controllerObj.find('[x-model]:input'); // update matches on every call

		var $scope = new Scope(controllerObj);
		window.Model[controller] = $scope;
		$scope.$$watch();

		for (var i = 0; i < this.matches.length; i++) { // for each match
			var m = $(this.matches[i]); // allocate into a variable called m
			var ma = m.attr('x-model'); // and catch the attr [x-model]

			m.on('keydown keyup',function(event) {
				$scope[$(this).attr('x-model')] = $(this).val()
			});

			$scope[ma] = m.val();
		};

		$scope.$$watch();
		return $scope;
	}
}

var Inspector = new Inspector();