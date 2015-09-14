function List(options){

	this.id = Hash();

	for (var property in options) {
		this[property] = options[property];
	}

	//this.store = Main.Stores[this.store];

	this._dom = $('<div class="list"></div>');
	this._dom.attr('id', this.id);

	if(this.title) {
		this._dom.prepend('<h3 class="page-divider">'+this.title+'</h3>')
	}

	if(this.scrollSelf && this.scrollSelf == true){
		console.debug('make this shit scroll itself');
	}

	if(this.socket && this.socket.connectTo){
		Main.SocketManager.connect(this.id, this.socket.connectTo);
		this.socket = Main.SocketManager.getSocket(this.id);

		this.socket.emit('adduser', Hash())

		this.socket.on('updaterooms', function (data) {
			this.socket.availableRooms = data;
		}.bind(this))

		this.socket.on('AllComments', function (data) {

			this.store.setData(data.body);

		}.bind(this))

		this.socket.on('updateCommentList', function (sender, response) {
			this.store.data.insert(this.store.dataset.rows.length, [response.picture, sender, response.message, new Date().getTime()])

		}.bind(this));
	}
	
	//this.prepareComponent();
	
	// event attachs
	this.configListeners();

	this.registerAsComponent();
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