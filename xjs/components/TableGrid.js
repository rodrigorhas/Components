function TableGrid( options ) {

	this._config(options);
	this._dom = $('<table class="table table-hover"></table>');
	this._dom.attr('id', this.id);

	if(this.title)
		this._dom.prepend('<h3 class="page-divider">'+this.title+'</h3>');

	if( this.store ) {

		var store = StoreManager.get(this.store);

		if( store ) {

			this.store = store;
		}

		else {

			throw new Error('Store not found -> '  + this.store);
		}
	}

	else {

		throw new Error('Store not found, table must contain at least one store as default');
	}
}

TableGrid.extend(BaseComponent);

TableGrid.prototype.init = function () {

	var $this = this,
		store = this.store;

	if ( store ) {

		this.configColumns ();

		store.onChange.listen(function ( item ) {
			$this.updateTable( item );
		});

		store.onLoad.listen(function ( data ) {
			$this.clearRows();
			$this.updateTable ({
				type: 'rebuild',
				data: data
			})
		});
	}
}

TableGrid.prototype.configColumns = function () {
	// prepare the same structure from store
	var cols = {};
	if( this.columns ) {
		for (var c in this.columns) {
			var a = this.columns[c];
			cols[a.name] = a;
		}
		this.columns = cols;
	}

	else {

		this.columns = store.getColumns();
	}

	var template = ['<thead>'],
		c = this.columns || store.getColumns();

	for (var k in c) {
		var column = c[k];
		template.push('<th>'+ k +'</th>')
	}

	template.push('</thead>');
	this.getDom().prepend(template.join(''));
}

TableGrid.prototype.clearRows = function () {
	q(this.getDom()[0]).find('tbody tr').remove();
}

TableGrid.prototype.updateTable = function ( item ) {
	var $this = this;

	var data = {
		columns: this.columns
	}

	if( isArray(item.data) ) {

		item.data.forEach(function ( row , index ) {
			changeStructure (row, item.type);
		});
	}

	else if( isObject(item.data, true) ) {

		for (var i in item.data) {
			changeStructure (item.data[i], 'insert');
		}
	}

	else {

		changeStructure( item );
	}

	function changeStructure ( item, type ) {
		if(!type) {
			data.row = item.data;
			type = item.type;
		}

		else {

			data.row = item;
		}

		console.log(data);

		var dom = $this.getDom(),
			template,
			pk = $this.store.getPK(),
			md5pk = MD5(String(data.row[pk]));

		switch (type) {

			case 'delete':
				var item = dom.find('[id="'+ md5pk + '"]');

				if( item ) {
					item.remove();
				}
			break;

			case 'insert':
				template = 
				'<tr id="'+ md5pk +'">\
					<% for (var key in this.data.columns) { %>\
						<td><% ((this.data.row[key]) ? this.data.row[key] : this.data.row[this.data.columns[key].dataIndex]) %></td>\
					<% } %>\
				</tr>';

				var row = $(Brackets.compile(template, { data: data }));
				dom.append(row);
				//q(dom[0]).append(row);
			break;
		}
	}
}