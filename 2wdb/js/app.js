Controller.new('main', {}, function($scope, $store){

	Stores.add(new Store({
		name: 'bla',
		model: Model.BlaModel,
		proxy: {
			select: '../select.json',
			insert: '../select.json',
		}
	}));

	var bla = $scope.bla = Stores.get('bla');

	bla.data.insert(10, [10, 'alan', 'design']);
	bla.data.insert(11, [11, 'bruno', 'dentista']);

	bla.data.update(11, {job: 'pintor', name: 'brandao'}, logAll);

	function logAll () {
		for (var i = 0; i < bla.dataset.fields.length; i++) {
			var field = bla.dataset.fields[i].name;

			for (var row in bla.dataset.rows) {
				var value = bla.dataset.rows[row];
				console.log(field , value.values[i]);
			};
		};
	}

})

Controller.new('secondary', {views: [], stores: ['bla']}, function($scope, $store){

	$scope.country = 'deuschs';

})