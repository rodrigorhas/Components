function TableGrid(options){

	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	this.store = Main.Stores[this.store]

	this._dom = $('<table class="table table-hover"></table>');
	this._dom.attr('id', this.id);

	if(this.scrollSelf && this.scrollSelf == true){
	}

	
	this.prepareComponent();
	
	// event attachs
	this.configListeners();

	this.registerAsComponent();
}

TableGrid.extend(BaseComponent);

TableGrid.prototype.prepareComponent = function (dom) {
	var  _this = this;


	this.loadData = function (callback) {

		this.store.ready.listen(function () {
			this.data = this.store.getData();

			if(callback) callback();
		}.bind(this))
	}

	// prevent double push in the store bind array
	//if(this.store.binds[this.store.binds.length-1] !=  this.id) this.store.binds[this.store.binds.length] = this.id;

	this.afterLoad = function () {

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

	        this.store.hasUpdate.listen(function () {
				_this.compile(true);
				console.log('compile by update event');
			})

		}
		
		this.compile = function (force) {
			this.loadData();
			var template = '\
				<thead>\
					<% for (var item in this.dataset.fields) { %>\
						<th><% this.dataset.fields[item] %></th>\
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

			tableContent = $(Brackets.compile(template, { dataset: this.data }));
			this._dom = this._dom.append(tableContent);
			this._dom.attr('id', this.id);

			if(force) {
				$('#' + this.id).replaceWith(this._dom);
			}

			this.reloadListeners(this._dom);
		}

		this.compile();

	}.bind(this)

	this.loadData(this.afterLoad);
};