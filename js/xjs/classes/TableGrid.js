function TableGrid(options){	
	this.options = options;
	
	if(isset(this.init)) 
		this.init({
			before: true
		});
}


TableGrid.extend(BaseComponent);

TableGrid.prototype.before = function (dom) {
	if(typeof this.data == "string")
		this.data = JSON.parse(this.data);

	var template = 
	'<table class="table table-hover">\
		<thead>\
			<% for (var item in this.dataset.fields) { %>\
				<th><% this.dataset.fields[item].name %></th>\
			<% } %>\
		</thead>\
		<tbody>\
			<% for (var i = 0; i < this.dataset.lines.length; i++) { %>\
				<tr>\
					<% for (var u = 0; u < this.dataset.fields.length; u++) { %>\
						<td><% this.dataset.lines[i][u] %></td>\
					<% } %>\
				</tr>\
			<%}%>\
		</tbody>\
	</table>';

	var result = Brackets.compile(template, { dataset: this.data });

	return result;
};