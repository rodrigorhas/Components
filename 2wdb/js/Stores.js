function Stores () {}

Stores.prototype.add = function (store) {
	this[store.name] = store;
}

Stores.prototype.get = function (storeName) {
	return this[storeName]
}

var Stores = new Stores();