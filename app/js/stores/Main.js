(function () {

	var store = StoreManager.add('mainStore', {
		proxy: {
			type: "json",
			autoload: true,

			select: 'app/js/stores/data.json'
		}
	});

		store
			.addColumn({
				name: 'id',
				type: 'int',
				ai: true
			})

			.addColumn('name')
			.addColumn("gender")
			.addColumn("company")
			.addColumn("email")
			.addColumn("phone")

			.setPK('id');

		store.proxy = {}

		/*
			// LISTENERS

			store.onDelete.listen(function (item) {
				console.log(item);
			});

			store.onInsert.listen(function (item) {
				console.log(item);
			});

			store.onUpdate.listen(function (item) {
				console.log(item);
			});

			store.onChange.listen(function (item) {
				console.log(item);
			});

		*/

		/*
			// METHODS

			var rand = Math.random() * 1000;

			for (var i = 0; i < rand; i++) {
				store.insert({name: Hash(), hash: Hash(20)});
			};

			store.delete(function (row) {
				if(row.name.indexOf('X') > -1)
					return true;
			});

			store.update(function (row) {
				if(row.name.indexOf('x') > -1)
					return {name: ':D'};
			});

			var data = store.select().where(function (row) {
				if(row.name == ":D") {
					return true;
				}
			});

		*/

	window.store = store;

})();