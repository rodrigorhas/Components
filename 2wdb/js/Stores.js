function Stores () {}

Stores.prototype.add = function (object) {

	this[object.name] = new Store(object);
}

Stores.prototype.get = function (storeName) {
	return this[storeName]
}

Main.Stores = new Stores();