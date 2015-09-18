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
}

TableGrid.extend(BaseComponent);

TableGrid.prototype.init = function () {
	var $this = this;
	var store = this.store;

	store.onChange.listen(function ( item ) {
		$this.updateTable( item );
	});
}

TableGrid.prototype.updateTable = function ( item ) {
	var $this = this;

	var data = {
		columns: $this.store.getColumns()
	}

	if( isArray(item.data) ) {

		item.data.forEach(function ( row , index ) {
			changeStructure (row, item.type);
		});
	}

	else {

		changeStructure( item );
	}

	function changeStructure ( item, type ) {
		var dom = $this.getDom(),
			template;

		switch (type) {
			case 'insert':
				template = 
				'<tr>\
					<% for (var key in this.data.columns) { %>\
						<td><% this.data.row[key] %></td>\
					<% } %>\
				</tr>';
			break;

			case 'rebuild':
				template = '\
					<thead>\
						<% for (var item in this.data.fields) { %>\
							<th><% this.data.fields[item] %></th>\
						<% } %>\
					</thead>\
					<tbody>\
						<% for (var i = 0; i < this.data.lines.length; i++) { %>\
							<tr>\
								<% for (var u = 0; u < this.data.fields.length; u++) { %>\
									<td><% this.data.lines[i][u] %></td>\
								<% } %>\
							</tr>\
						<%}%>\
					</tbody>\
				</table>';
			break;
		}

		data.row = item;

		var row = $(Brackets.compile(template, { data: data }));

		dom.append(row)
	}
}