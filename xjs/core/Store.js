(function () {

	/*
		StoreManager class
	*/

	function StoreManager () {}

	StoreManager.prototype.add = function (name, config) {

		if(!config) config = false;
		this[name] = new Store(name, config);

		return this[name];
	}

	StoreManager.prototype.get = function (storeName) {
		return this[storeName];
	}

	/*
		Store class
	*/

	function Store (name, config) {
		var $this = this;

		this.name = name;

		this.columns = {};
		this.data = {};

		if( config ) {
			if ( config.proxy ) {
				this.configProxy(config.proxy);
			}
		}

		// store basic info Object:Functions
		this.info = {

			initAt: Date.now(),

			count : {

				columns: function () {

					return Object.keys($this.columns).length;
				},

				rows: function () {

					return Object.keys($this.data).length;
				}
			},

			size: function () {

				return this.count.columns() * this.count.rows ()
			}
		}

		this.types = {
			'string' : isString,
			'number': isNumber,
			'int': function ( t ) {
				if(isNumber(t) && String(t).indexOf('.') == -1)
					return true;
				return false;
			}
		}

		this.pk = null;

		// events
		this.onChange = new Event();
		this.onInsert = new Event();
		this.onDelete = new Event();
		this.onUpdate = new Event();
	}

	Store.prototype.fn = {
		tryParseJSON: function ( jsonString ) {
		    try {
		        var o = JSON.parse(jsonString);
		        if (o && typeof o === "object" && o !== null) {
		            return o;
		        }
		    }
		    catch (e) { }

		    return false;
		}
	};

	Store.prototype.dispatch = function ( data ) {

		data.time = Date.now();

		this.onChange.trigger(data);
		this['on' + capitalize(data.type)].trigger(data);
	}

	/*
		Proxy
	*/

	Store.prototype.load = function ( callback ) {

		if(!callback) callback = function () {};

		var $this = this,
			type = this.proxy.type;

		// load with ajax
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();

			request.onreadystatechange = function () {
			    if (request.readyState == 4 && request.status == 200) {
			    	if( type == 'json') {
			        	var json = $this.fn.tryParseJSON(request.responseText);
			        	console.log(json);

			        	resolve(json);
			    	}
			    }

			    else if (!request.status == 200) {
				    reject(request.readyState, request.status);
			    }
			}

			request.open("GET", $this.proxy.select, true);
			request.send();
		});

		promise.then(function () {
			var r = callback.apply(window, arguments);

			if( r ) data = r;

			$this.insert.apply($this, arguments);
		});
	}

	Store.prototype.configProxy = function ( proxy ) {

		this.proxy = (this.proxy) ? this.proxy : {};

		for (var property in proxy) {
			var val = proxy[property];
			this.proxy[property] = val;
		}

		var p = this.proxy;

		if(p.select && p.autoload) {
			this.load();
		}
	}

	/*
		Basics get
	*/

	Store.prototype.getName = function () {

		return (this.name) ? this.name : null;
	}

	Store.prototype.getData = function () {

		return this.select().where(function () {return true});
	}

	Store.prototype.getColumns = function () {

		return (this.columns) ? this.columns : {};
	}

	/*
		Basic functions
	*/

	Store.prototype.addColumn = function ( col ) {
		if(isString(col)) {
			this.columns[col] = new Column(col);
		}

		else {
			this.columns[col.name] = new Column(col);
		}

		return this;
	}

	Store.prototype.setPK = function ( pk ) {

		this.pk = pk;
	}

	Store.prototype.getPK = function ( pk ) {

		return this.pk;
	}

	/*
		C - R- U - D
	*/

	Store.prototype.insert = function ( data ) {
		var $this = this,
			pk = this.getPK();

		if ( isArray(data) ) {
			for (var i in data) {
				validateAndInsert(data[i]);
			}
		}

		else if (isObject(data, true)) {

			validateAndInsert(data);
		}

		function validateAndInsert ( item ) {

			for (var columnName in $this.columns) {

				var col = $this.columns[columnName]; // <Object>
				var isValid = $this.types[col.type]; // <Function>

				if( item[columnName] ) {
					var val = item[columnName];

					if ( isValid (val) ) {

						if( col.length ) {
							var v;
							v = (!isString(val)) ? v = String(val) : v = val;

							item[columnName] = v.slice(0, col.length);
						}

						continue;
					}

					else {
						console.error(
							'Wrong type, ' +
							columnName + ':Column<'+ capitalize(col.type) + '> ' +
							'=> ' +
							val        + ':Value<' + capitalize(typeof val) + '>'
						);

						return $this;
					}
				}

				else {
					if ( col.an ) {

						item[columnName] = null;
					}

					else if ( col.ai ) {

						var dataKeys = dataKeys = Object.keys($this.data);
						var dataLen = dataKeys.length;
						var dataLast = $this.data[dataKeys[dataLen - 1]];

						var lastKey = (!dataLen) ? 1 : dataLast[columnName] + 1;

						item[columnName] = lastKey;
					}

					else {

						return console.error('Missing col -> ' + columnName );
					}
				}
			}

			$this.data[item[pk]] = item;
		}

		this.dispatch({
			type: 'insert',
			time: Date.now(),
			data : data
		});

		return this;
	}

	Store.prototype.select = function ( keys ) {

		if ( isObject( keys ) ) {
			console.warn ('Select method doesn\'t support Object');
			return [];
		}

		if ( !keys ) keys = Object.keys(this.columns);

		if ( isString(keys) ) {
			keys = keys.replace(/\s/ig, '');
			keys = keys.split(',');
		}

		return new Select (keys, this.data);
	}

	/*
		Column class
	*/

	function Column ( config ) {

		this.an = false;
		this.zf = false;
		this.type = "string";

		if ( isString(config) ) {

			this.name = config;
		}

		else {
			for (var key in config) {
				var val = config[key];
				this[key] = config[key];
			}

			if ( config.ai && ['number', 'int'].indexOf(this.type) == -1 ) {
				throw new Error('Only (number, int) types can be auto incremented, please fix it');
			}
		}

		return this;
	}

	Column.prototype.eq = function (val) {

		var o = {
			exec: function () {
				return (this.tv == this.gv) ? true : false;
			}
		};

		o.tv = val;
		o.key = this.name;

		return o;
	}

	/*
		Select method
	*/

	function Select ( keys, data ) {
		this.keys = keys;

		this.data = {}
		this.rawData = data;

		for (var k in data) {

			var row = data[k];

			var r = {};
			for (var prop in row) {
				if (this.keys.indexOf(prop) > - 1) {
					r[prop] = row[prop];
				}
			}

			this.data[k] = r;
		}
	}

	/*Select.prototype.where = function (fn) {

		if(!fn || !isFunction(fn)) return;

		var arr = [];
		var $this = this;
		var skip = this.skip;
		var limit = this.limit;

		for (var index in this.data) {
			
			if( skip ) {
				--skip;
				continue;
			}

			if ( arr.length == limit )
				break;

			var row = this.data[index];

			var match = fn($this.rawData[index]);
			if ( match ) {
				if ( isBool(match) || isNumber(match) )
					match = row;

				arr.push(match);
			}
		}

		return arr;
	}*/

	Select.prototype.where = function (test) {

		var arr = [];
		var $this = this;
		var skip = this.skip;
		var limit = this.limit;

		for (var index in this.data) {
			
			if( skip ) {
				--skip;
				continue;
			}

			if ( arr.length == limit )
				break;

			var row = this.data[index];
			test.gv = $this.rawData[index][test.key];
			var match = test.exec();

			if ( match ) {
				if ( isBool(match) || isNumber(match) )
					match = row;

				arr.push(match);
			}
		}

		return arr;
	}

	Select.prototype.limit = function ( num ) {

		this.limit = num;
		return this;
	}

	Select.prototype.skip = function ( num ) {

		this.skip = num;
		return this;
	}

	/*
		Delete Method
	*/

	Store.prototype.delete = function (fn) {

		if(!fn || !isFunction(fn)) return;

		var deleted = [];

		for (var i in this.data) {
			var row = this.data[i];

			var match = fn(this.data[i]);

			if( match ) {
				if ( isBool(match) || isNumber(match) )
					match = i;

				deleted.push (row);
				delete this.data[i]
			}
		}

		this.dispatch({
			type: 'delete',
			data: deleted
		});
	}

	/*
		Update Method
	*/

	Store.prototype.update = function (fn) {

		if(!fn || !isFunction(fn)) return;

		for (var i in this.data) {

			var row = this.data[i];
			var changes = fn(this.data[i]);
			var oldValues = {};

			if ( isObject(changes, true) ) {

				for (var ck in changes) {
					var cv = changes[ck];

					if ( cv != row[ck] ) {
						oldValues[ck] = row[ck];
						row[ck] = cv;
					}
				}

				this.dispatch({
					type: 'update',
					data: {
						oldVal: oldValues,
						newVal: changes
					}
				});
			}
		};
	}

	window.StoreManager = new StoreManager ();

})();