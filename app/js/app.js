var data = [
	'xjs/css/style.css',
	'app/css/style.css',

	'xjs/lib/jquery.js',
	'xjs/lib/jquery-ui.js',
	'xjs/lib/Event.js',
	'xjs/lib/Extend.js',
	'xjs/lib/MD5.js',

	'xjs/util/Util.js',

	'xjs/components/BaseComponent.js',

	'xjs/core/Store.js',
	'xjs/core/Main.js',
	'xjs/core/Model.js',
	'xjs/core/Router.js',
	'xjs/core/View.js',
	'xjs/core/Controller.js',
	'xjs/core/WindowFocus.js',
	'xjs/core/Brackets.js',

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

	// Stores
	'app/js/stores/Main.js',
];

require( data, function () {
	$(function () {

		$.fn.disableSelection = function() {

		    return this.attr('unselectable', 'on')
		       .css({'-moz-user-select':'-moz-none',
		             '-moz-user-select':'none',
		             '-o-user-select':'none',
		             '-khtml-user-select':'none',
		             '-webkit-user-select':'none',
		             '-ms-user-select':'none',
		             'user-select':'none'})
			       .bind('selectstart', false);
		};

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

				init: function (obj) {
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
							obj.formButtonClicked.trigger(text);
					})
				}
			}
		});

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
								{id: 'btn2', xtype: 'Button', label: 'toggle toolbar'},
								{id: 'btn3', xtype: 'Button', label: 'create panel'},
								{id: 'btn4', xtype: 'Button', label: 'delete all panels'},
								{id: 'clearStore', xtype: 'Button', label: 'Clear Store'}
							]
						},

						{id: 'postform', xtype: 'easyPost'},
						{
							id: 'mainGrid',
							xtype: 'TableGrid',
							//store: 'mainStore'
						},
					]
				}
			]
		});

		Main.controller({

			name: 'mainController',
			view: 'mainView',

			ready : function (element, view) {

			    element.btn2.onclick.listen(function (e, dom) {
			    	element.toolbar._dom.toggleClass('min');
			    });

			    element.btn3.onclick.listen(function (e, dom) {
			    	WindowManager.createInstance ({
						name: "panel-" + (WindowManager.maxZindex + 1),

						dimensions : {
							width: 150,
							height : 175
						},

						pos: {
							x: 270,
							y: 100
						},

						resizable: false,
						borderless: true,
						shadow: true
					});
			    });

			    element.btn4.onclick.listen(function (e, dom) {
					WindowManager.removeAll();
			    });

			    element.clearStore.onclick.listen(function (e, dom) {
					store.delete(function () { return true; })
			    });

			    element.postform.formButtonClicked.listen(function ( response ) {
			    	store.insert({name: response});
			    });
			}
		});

	});
}); 