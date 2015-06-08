Controller.new('main', {}, function($scope, $store){

	Stores.add(new Store({
		name: 'bla',
		model: BlaModel,
		/*proxy: {
			select: '../select.json',
			insert: '../select.json',
		}*/
	}));

	var bla = $scope.bla = Stores.get('bla');

	bla.data.insert(3, [3, 'alan', 'design']);
	bla.data.insert(4, [4, 'bruno', 'dentista']);

	bla.data.update(4, {job: 'pintor', name: 'brandao'})

	for (var i = 0; i < bla.dataset.fields.length; i++) {
		console.log(bla.dataset.fields[i].name)
	};

})

Controller.new('secondary', {views: [], stores: ['bla']}, function($scope, $store){

	$scope.country = 'deuschs';

})