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
	var $this = this,
		store = this.store;

	if ( store ) {

		var template = ['<thead>'],
			c = store.getColumns();

		for (var k in c) {
			var column = c[k];
			template.push('<th>'+ k +'</th>')
		}

		template.push('</thead>');
		this.getDom().prepend(template.join(''));

		store.onChange.listen(function ( item ) {
			$this.updateTable( item );
		});
	}

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
		if(!type) {
			data.row = item.data;
			type = item.type;
		}

		else {

			data.row = item;
		}

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
						<td><% this.data.row[key] %></td>\
					<% } %>\
				</tr>';

				var row = $(Brackets.compile(template, { data: data }));
				dom.append(row);
			break;

			case 'rebuild':
				dom.find('tbody').children().remove();

				template = '\
				<tr id="'+ md5pk +'">\
					<% for (var key in this.data.columns) { %>\
						<td><% this.data.row[key] %></td>\
					<% } %>\
				</tr>'

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
	}
}