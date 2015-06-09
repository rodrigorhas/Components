function Store (object) {
	this.name = object.name;
	this.model = object.model;
	this.dataset = {fields: [], rows: {}};
	this.proxy = (object.proxy) ? object.proxy: false;

	this.requesting = false;
	this.stackList = {};

	var _this = this;

	this.data = {
		insert : function (id, values, callback) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(_this.newHash(15), function (){ var __this = _this;  __this.data.insert(id, values, callback);});
			}

			// caso nao esteja fazendo uma requisiçao

			var model = _this.model(id, values); // cria o model

			if(_this.dataset.fields != model.fields) { //se os fields do dataset forem diferentes dos models, sobrescreva
				_this.dataset.fields = model.fields;
			}

			delete model.fields // delete os campos para nao aparecer nas rows do dataset

			_this.dataset.rows[model.id] = model; // insere a row no objeto rows do dataset

			if (isset(callback)) callback()

		},

		delete: function (id, callback) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(_this.newHash(15), function (){ var __this = _this;  __this.data.delete(id, callback);});
			}

			var dataset = _this.dataset.rows;

			for (var row in _this.dataset.rows){
				if(row == id){
					delete dataset[row];
				}
			}

			if (isset(callback)) callback()
		},

		update: function (id, object, callback) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(_this.newHash(15), function (){ var __this = _this;  __this.data.update(id, object, callback);});
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

			if (isset(callback)) callback()
		},

		select : function (query, config, callback) {

			if(_this.requesting) { // se estiver fazendo um requisiçao, manda pra stackList
				return _this.stack(_this.newHash(15), function (){ var __this = _this;  __this.data.select(query, config,callback);});
			}

			var defaultOptions = {
				cs : false,
				io : false,
				log : false
			}

			if(typeof config != "object") {

				callback = config;
				config = defaultOptions;

			} else if(typeof config == "function") {
				callback = config;

			} else {

				if ( !isset(config.cs) ) {
					config.cs = defaultOptions.cs;
				}

				if ( !isset(config.io) ) {
					config.io = defaultOptions.io;
				}

				if ( !isset(config.log) ) {
					config.log = defaultOptions.log;
				}
			}

			config.cs = (!config.cs) ? 'i' : ''; // seta a flag do regexp

			var q = query.split(':'); // main string
			var result = []; // array de resultados

			var field = q[0]; // campos
			var search = q[1]; // pesquisa

			if(search.split(' ').length > 1) {// caso tenha mais de uma palavra
				search = search.replace(/\s\s+/g, ' '); // retira os dupes de espcaço
				search = search.split(' ') // split pro espaco (separa as palavras)
				var multi = true; // diz que a pesquisa é por varias palavras
			}

			for (var i = 0; i < _this.dataset.fields.length; i++) { // para cada campo
				var f = _this.dataset.fields[i]; // shortname
				f = f.name.toLowerCase();  // bota os campos em lowercase pra nao ter conflito (Object <=> Model)

				if(f == field) { // se achar o campo de acordo com o requsitado
					var index = i;
				}
			};

			for ( var prop in _this.dataset.rows ) { // para cada linha
				var row = _this.dataset.rows; // shortname
				var val = row[prop].values[index]; // pega o valor da linha batendo com o campo requisitado

				if (isset(multi)) { // se for pesquisa multua

					var temp = ""; // nova variavel, "" => pra nao dar undefined no +=
					var last = search[search.length-1]; // ultima palavra
					for (var i = 0; i < search.length-1; i++) { // pra cada palavra
						temp += search[i] + '|'; // adiciona o pipe pra fazer a string do regex
					};

					temp += last; // adiciona o ultimo

					if(config.oi) { // oi true and multi

						if(new RegExp(temp, config.cs + 'g').test(val)){
							result.push(prop);
						}

					} else { // oi false and multi
						if(new RegExp(temp, config.cs + 'g').test(val)){
							result.push(row[prop]);
						}
					}
				} else { // not mult
					if(config.oi) { // only indexes
						if(new RegExp(search, config.cs + 'g').test(val)){
							result.push(prop);
						}
					} else { // row
						if(new RegExp(search, config.cs + 'g').test(val)){
							result.push(row[prop]);
						}
					}
				}


			}

			if(result) {
				if(config.log) {
					console.log(result)
				} else {
					if (isset(callback)) callback()
					return result;
				}
			}
		}
	}

	if(this.proxy) this.pull();

}

Store.prototype = {
	update : function () {
		//console.debug('updating data from store -> ' + this.name );
		//console.debug(this.push, this.pull)
	},

	push: function () {
		//console.log('pushing all changes from store -> ' + this.name + ', throught ' + this.proxy.insert)
	},

	pull: function () {
		var _this = this;
		this.requesting = true;

		//console.log('pulling all changes from store -> ' + this.name + ', throught ' + this.proxy.select);

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
	},

	newHash: function (L){
		if(!isset(L)) L = 10;
	    var s= '';
	    var randomchar=function(){
	    	var n= Math.floor(Math.random()*62);
	    	if(n<10) return n; //1-10
	    	if(n<36) return String.fromCharCode(n+55); //A-Z
	    	return String.fromCharCode(n+61); //a-z
	    }
	    while(s.length< L) s+= randomchar();
	    return s;
	},
}