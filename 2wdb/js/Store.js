function Store (object) {
	this.name = object.name;
	this.model = object.model;
	this.dataset = {fields: [], rows: {}};
	this.proxy = (object.proxy) ? object.proxy: false;

	this.requesting = false;
	this.stackList = {};

	var _this = this;

	this.data = {
		insert : function (id, values) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(id, function (){ var __this = _this;  __this.data.insert(id, values);});
			}

			// caso nao esteja fazendo uma requisiçao

			var model = _this.model(id, values); // cria o model

			if(_this.dataset.fields != model.fields) { //se os fields do dataset forem diferentes dos models, sobrescreva
				_this.dataset.fields = model.fields;
			}

			delete model.fields // delete os campos para nao aparecer nas rows do dataset

			_this.dataset.rows[model.id] = model; // insere a row no objeto rows do dataset

		},

		delete: function (id) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(id, function (){ var __this = _this;  __this.data.delete(id);});
			}

			var dataset = _this.dataset.rows;

			for (var row in _this.dataset.rows){
				if(row == id){
					delete dataset[row];
				}
			}
		},

		update: function (id, object) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(id, function (){ var __this = _this;  __this.data.update(id, object);});
			}

			var dataset = _this.dataset;
			var index;

			for (var prop in object){ // para cada prop no object update

				for (var field in dataset.fields) { // verifica em cada campo do dataset
					var f = dataset.fields;

					if (f[field].name.toLowerCase() == prop) { // se o campo do dataset == a prop do object update
						index = field; // index do campo no dataset.fields
					}

				}

				for (var row in dataset.rows) {
					if(row == id) {
						dataset.rows[row].values[index] = object[prop]
					}
				}
			}
		}
	}

	if(this.proxy) this.pull();

}

Store.prototype = {
	update : function () {
		console.debug('updating data from store -> ' + this.name );
		console.debug(this.push, this.pull)
	},

	push: function () {
		console.log('pushing all changes from store -> ' + this.name + ', throught ' + this.proxy.insert)
	},

	pull: function () {
		var _this = this;
		this.requesting = true;

		console.log('pulling all changes from store -> ' + this.name + ', throught ' + this.proxy.select);

		$.ajax({
			url: this.proxy.select,
			success: function (response) {
				_this.requesting = false;
				if(typeof response == "string") response = JSON.parse(response); response = response.data

				//console.debug('data received -> ', response);
				_this.dataset.rows = response;

				_this.dataset.fields = _this.model().fields

				_this.stackApply();

			}
		}).fail(function (error){
			console.error(error);
		})
	},

	stack : function (type ,fn) {
		this.stackList[type] = function () { fn() };
	},

	stackApply : function () {
		for (var current in this.stackList) {
			this.stackList[current]()
		};
	}
}