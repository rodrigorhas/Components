var app = Main.application({
	requires: [
	'Viewport', 'Toolbar','Button', 'Card',
	'Container','Label', 'PageDivider',
	'TableGrid', 'Checkbox', 'Input', 'Window',
	'Grid', 'ShortcutToolbar'
	]
})

var scp;

Main.controller('main', {views: [], stores: ['mainStore']}, function($scope, $store, $view){

	console.log($view)

	$store.data.insert(10, [10, 'alan', 'design']);
	$store.data.insert(11, [11, 'bruno', 'dentista']);
	$store.data.insert(12, [12, 'alan rodrigo', 'dentista']);

	$store.data.update(11, {job: 'pintor', name: 'Alan'}, logAll);

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

	//Main.loadFile('Main.app.stores.mainStore');

	$scope.names = 'rodrigo'

	//$store.data.select('name|country:rodrigo', {oi: true});

	scp = $scope;

})