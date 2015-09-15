(function () {

	/*
		StoreManager class
	*/

	function StoreManager () {}

	StoreManager.prototype.add = function (name) {
		this[name] = new Store(name);

		return this[name]
	}

	StoreManager.prototype.get = function (storeName) {
		return this[storeName];
	}

	/*
		Store class
	*/

	function Store (name) {
		var $this = this;

		this.name = name;

		this.columns = {};
		this.data = [];

		// store basic info Object:Functions
		this.info = {

			initAt: Date.now(),
			count : {
				columns: function () {
					return Object.keys($this.columns).length;
				},

				rows: function () {
					return $this.data.length;
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

		this.pk = [];

		// events

		this.onChange = new Event();
		this.onInsert = new Event();
		this.onDelete = new Event();
		this.onUpdate = new Event();
	}

	Store.prototype.dispatch = function ( data ) {

		data.time = Date.now();

		this.onChange.trigger(data);

		var type = data.type;
		delete data.type;

		this['on' + capitalize(type)].trigger(data);

	}

	/*
		Basics get
	*/

	Store.prototype.getName = function () {
		return (this.name) ? this.name : null;
	}

	Store.prototype.getData = function () {
		return (this.data) ? this.data : [];
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

	Store.prototype.addPK = function ( arr ) {
		if ( !isArray(arr) ) {
			console.warn ('PK must be an array');
			return;
		}

		this.pk = arr;
	}

	/*
		C - R- U - D
	*/

	Store.prototype.insert = function ( data ) {
		var $this = this;

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

							/*if(v.length > col.length) {
								return console.error(
									'Max column data length is ' + col.length +
									', at '+ $this.pk[0] +':' + item[$this.pk[0]]
								);
							}*/
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
						//console.warn ( columnName + '<Column> not found, but can be null' );
					}

					else if ( col.ai ) {
						var lastKey = (!$this.data.length) ? $this.data.length + 1 : lastOf($this.data)[columnName] + 1;

						item[columnName] = lastKey;
					}

					else {

						return console.error('missing col -> ' + columnName );
					}
				}
			}

			$this.data.push ( item );
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

	/*
		Select method
	*/

	function Select ( keys, data ) {
		this.keys = keys;

		this.data = data.map(function ( row ) {
			var r = {};
			for (var prop in row) {
				if (this.keys.indexOf(prop) > - 1) {
					r[prop] = row[prop];
				}
			}

			return r;
		}.bind(this));

		this.rawData = data;
	}

	Select.prototype.where = function (fn) {

		if(!fn || !isFunction(fn)) return;

		var arr = [];
		var $this = this;

		this.data.filter(function (row, index) {
			var match = fn($this.rawData[index]);
			if ( match ) {
				if ( isBool(match) || isNumber(match) )
					match = row;

				arr.push(match);
			}
		});

		return arr;
	}

	/*
		Delete Method
	*/

	Store.prototype.delete = function (fn) {

		if(!fn || !isFunction(fn)) return;

		var deleted = [];

		for (var i = 0; i < this.data.length; i++) {
			var row = this.data[i];
			var match = fn(this.data[i]);
			if(match) {
				if ( isBool(match) || isNumber(match) )
					match = i;

				deleted.push (row);
				this.data.splice(i, 1);
			}
		};

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

		for (var i = 0; i < this.data.length; i++) {
			var row = this.data[i];
			var match = fn(this.data[i]);

			/*if(match) {
				if ( isBool(match) || isNumber(match) )
					match = i;

				this.data.splice(i, 1);
			}*/
		};
	}

	window.StoreManager = new StoreManager ();

})();