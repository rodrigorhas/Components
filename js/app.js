function load (url, callback) {
	var count = 0;

	if(isArray(url)) {
		count = url.length;

		for ( i in url ) {
			tryDown(url[i], callback, true);
		}
	}

	else if( isString(url) ) {
		tryDown(url, callback);
	}

	function tryDown (url, callback, queue) {
		var type = url.match(/.(\w+)$/ig);

		if ( !type ) return;

		type = type[0];

		var node;

		switch ( type ) {
			case '.js':
			node = document.createElement('script');
			node.src = url;
			break;
		}

		node.onload = function () {
			if( queue ) --count;
			if(isFunction(callback)) {
				if( queue && count == 0) {
					 callback ();
				}

				else if (!queue) {
					callback();
				}
			}
		}

		node.onerror = function () {
			//console.error('cannot find ' + url);
		}

		document.body.appendChild(node);
	}
}

var preload = [
	'xjs/lib/jquery-ui.js',
	'xjs/lib/Event.js',
	'xjs/lib/Extend.js',
	'xjs/util/Util.js',

	'xjs/components/BaseComponent.js',

	'xjs/core/Store.js',
	'xjs/core/Main.js',
	'xjs/core/Model.js',
	'xjs/core/Router.js',
	'xjs/core/View.js',
	'xjs/core/Controller.js',
	'xjs/core/WindowFocus.js',

	'xjs/components/Viewport.js',
	'xjs/components/Container.js',
	'xjs/components/Button.js',
	'xjs/components/Toolbar.js',
	'xjs/components/ShortcutToolbar.js',
	'xjs/components/List.js',
	'xjs/components/PageDivider.js',
	'xjs/components/TableGrid.js',
	'xjs/components/Window.js',
	'xjs/components/Template.js',
	'xjs/components/Label.js',
	'xjs/components/Input.js',
	'xjs/components/Grid.js',
	'xjs/components/Checkbox.js',
	'xjs/components/Card.js',
	'xjs/components/Factory.js',
];

load( preload, function () {
	$(function () {

		Main.viewport();

		// Custom form 

		Main.create('easyPost', {
			extend: BaseComponent,

			prototype: {
				_dom : '\
				<div class="card easy-post">\
					<div contenteditable="true" data-placeholder="Write something"></div>\
					<div class="card-body card-padding clearfix">\
						<button class="btn btn-blue pull-right">Post</button>\
					</div>\
				</div>',

				customize: function (obj) {
					var dom = $(obj._dom);

					obj.formButtonClicked = new Event();

					obj.getText = function () {
						return dom.find('[contenteditable]').text();
					}

					obj.clearText = function () {
						return dom.find('[contenteditable]').empty();
					}

					dom.find('button').on('click', function () {
						var text = obj.getText();
						obj.clearText();
						if(text.length)
							obj.formButtonClicked.trigger({comment: text});
					})
				}
			}
		})

		/*Main.router({

			init: {
				routeName: '/',
				controller : 'mainController'
			},

			when: [
				{
					routeName: '/profile',
					controller: 'configController'
				}
			],

			otherwise : '/'
		})*/


		Main.view({
			name: 'mainView',

			allowScroll : true,

			items: [

				{
					xtype: 'Container',
					cls: 'pd-top',

					items: [
						{
							id: 'toolbar',
							title: 'Kommit',
							xtype: 'Toolbar',
							size: 'min',
							items: [
								{id: 'btn1', xtype: 'Button', label: 'Profile'},
								{id: 'btn2', xtype: 'Button', label: 'toggle toolbar'},
								{id: 'btn3', xtype: 'Button', label: 'open window'},
								{id: 'btn4', xtype: 'Button', label: 'new window'}
							]
						},

						{id: 'postform', xtype: 'easyPost'},

						{
							id: 'commentList',
							xtype: 'List',
							title: 'last comments',
							store: 'kommit',
							/*socket: {
								connectTo: 'http://localhost:8081'
							}*/
						}
					]
				}
			],

			listeners : function (view) {
				view.btn1._dom.click(function (e){
					view.btn1.onclick.trigger(e, view.btn1);
				})

				view.btn2._dom.click(function (e){
					view.btn2.onclick.trigger(e, view.btn2);
				});

				view.btn3._dom.click(function (e){
					view.btn3.onclick.trigger(e, view.btn3);
				});

				view.btn4._dom.click(function (e){
					view.btn4.onclick.trigger(e, view.btn4);
				});
			}
		});
		
		Main.controller({
			name: 'mainController',

			view: 'mainView',

			ready : function (element, view) {
				element.btn1.onclick.listen(function (e, dom) {
			    	//Main.router.go('/profile', true);
			    });

			    element.btn2.onclick.listen(function (e, dom) {
			    	element.toolbar._dom.toggleClass('min');
			    });

			    element.btn3.onclick.listen(function (e, dom) {
			    	new Window({id: 'newWindow', toolbarButtons: {minimize: true}}).render('#' + view._id);
			    });

			    element.btn4.onclick.listen(function (e, dom) {
			    	new Window({id: 'secondWindow', toolbarButtons: {maximize: true}}).render('#' + view._id);
			    });

			    element.postform.formButtonClicked.listen(function (response) {
			    	response = {message: response.comment, picture: null || 'https://s3.amazonaws.com/uifaces/faces/twitter/sillyleo/128.jpg'}
			    	element.commentList.socket.emit('sendComment', response);
			    })
			}
		})

		var store = StoreManager.add('todo');

		store
			.addColumn({
				name: 'id',
				type: 'int',
				ai: true
			})

			.addColumn({
				name: 'name',
				type: 'string',
				an : true,
				length: 6
			})

			.addPK(['id']);

		/*for (var i = 0; i < 500; i++) {
			store.insert({name: Hash().slice(3), hash: Hash(2)})
		};

		store.delete(function (row) {
			if(row.name.indexOf('X') > -1)
				return true;
		});

		store.update(function (row) {
			if(row.name.indexOf('x') > -1)
				row.name = ':D';
		});

		var data = store.select().where(function (row) {
			if(row.name == ":D") {
				return true;
			}
		});*/

		window.store = store;

	});
});