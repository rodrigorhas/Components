function List(options){

	this._config(options);
	this._dom = $('<div class="list"></div>');
	this._dom.attr('id', this.id);

	if(this.title)
		this._dom.prepend('<h3 class="page-divider">'+this.title+'</h3>');
}

List.extend(BaseComponent);

/*List.prototype.prepareComponent = function (dom) {
	var  _this = this;


	this.loadData = function (callback) {
		this.store.ready.listen(function () {
			this.data = this.store.getData();
			console.log(this.data);

			if(callback) callback();
		}.bind(this));
	}

	this.afterLoad = function () {

		this.compile = function (force) {

			var template = '\
			<ul class="infinity-list">\
				<% for (var i = 0; i < this.dataset.rows.length; i++) { var row = this.dataset.rows[i]; %>\
				<li class="list-item">\
					<div class="post-face-min">\
						<img src="<% row[0] %>" alt="">\
					</div>\
					<div class="post-details">\
						<div class="top">\
							<b><% row[1] %></b><% row[2] %>\
						</div>\
						<div class="bottom">\
							<% row[3] %>\
						</div>\
					</div>\
				</li>\
				<% } %>\
			</ul>';

			// para os ultimos serem os primeiros
			this.data.rows.reverse() 

			tableContent = $(Brackets.compile(template, { dataset: this.data }));

			if(force){
				this._dom.find('ul').replaceWith(tableContent);
			} else {
				this._dom = this._dom.append(tableContent);
			}

			this._dom.fadeIn(500);
		}

		console.log('compiling');

		this.store.hasUpdate.listen(function () {
			this.data = this.store.getData()
			this.compile(true);
		}.bind(this))

		this.compile();

	}.bind(this)

	this.loadData(this.afterLoad);
};*/