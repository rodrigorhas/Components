Main.controller('main', {views: [], stores: ['mainStore']}, function($scope, $store){

	$store.data.insert(10, [10, 'alan', 'design']);
	$store.data.insert(11, [11, 'bruno', 'dentista']);

	$store.data.update(11, {job: 'pintor', name: 'brandao'}, logAll);

	function logAll () {
		/*for (var i = 0; i < $store.dataset.fields.length; i++) {
			var field = $store.dataset.fields[i].name;

			for (var row in $store.dataset.rows) {
				var value = $store.dataset.rows[row];
				console.log(field , value.values[i]);
			};
		};*/
	}

	// loadFile function example
	// see the consoler for more info
	Main.loadFile('Main.app.stores.finanStore.storage');

})

Main.controller('secondary', {views: [], stores: ['mainStore']}, function($scope, $store){

	$scope.country = 'deuschs';

})