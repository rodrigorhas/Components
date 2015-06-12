function TableGrid(options){	
	this.options = options;
	
	if(isset(this.init)) this.init({
		before: true
	});
}

TableGrid.extend(BaseComponent);

TableGrid.prototype.before = function (dom) {
	var  _this = this;

	if (typeof this.data == "string") {
		this.store = Main.Stores[this.data];
	}
	
	this.reloadData = function () {
		this.data = this.store.getData()
	}

	// prevent double push in the store bind array
	if(this.store.binds[this.store.binds.length-1] !=  this.id) this.store.binds[this.store.binds.length] = this.id

	this.reloadListeners = function (table) {
		table.find('th')
        .wrapInner('<span data-sort="true"/>')
        .each(function(){
            
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            th.click(function(){
                
                table.find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                	aa = parseInt(a);
                	bb = parseInt(b);

                	if (typeof aa != NaN) a = aa;
                	if (typeof bb != NaN) b == bb;
                    
                    return $.text([a]) > $.text([b]) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                
                inverse = !inverse;
                    
            });
                
        });

        this.table.on('update', function () {
			_this.compile(true);
			console.log('compile by update event');
		})

	}
	
	this.compile = function (force) {
		this.reloadData();
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


		this.table = $(Brackets.compile(template, { dataset: this.data }));
		this.table.attr('id', this.id)

		if(force) {
			$('#' + this.id).replaceWith(this.table);
		}

		this.reloadListeners(this.table);
	}

	this.compile();

	return this.table;
};