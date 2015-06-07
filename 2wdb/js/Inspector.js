function Inspector () {

	var __this = this;

	this.bind = {};

}

Inspector.prototype = {
	match: function () {
		this.matches = $('[x-model]:input'); // update matches on every call

		for (var i = 0; i < this.matches.length; i++) { // for each match
			var m = $(this.matches[i]); // allocate into a variable called m
			var ma = m.attr('x-model'); // and catch the attr [x-model]


			m.on('keyup keydown',function(event) {
				$scope[$(this).attr('x-model')] = $(this).val()
			});

			$scope[ma] = m.val();
		};

		$scope.$$watch();
	}
}

var Inspector = new Inspector();