(function (  ) {

	/*
		StoreManager
	*/

	function Stores () {}

	Stores.prototype.add = function ( name ) {

		return this[name] = new Store(name);
	}

	Stores.prototype.get = function ( storeName ) {
		return this[storeName];
	}

	/*
		Store Class
	*/

	var Store = function ( name ) {
		this.name = name;
		this.columns = [];
		this.rows = [];
	}

	Store.prototype.addColumn = function ( name, type ) {
		this.columns.push ({
			name: name,
			type: type
		})

		return this;
	}

	Store.prototype.createRow = function ( row ) {
		console.log(row);
	}

	/*
		Store ROW class
	*/

	window.StoreManager = Stores;

})();