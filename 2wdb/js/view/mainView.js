Main.view(function () {

	new Viewport({
		controller: ['main'],

		items : [
			new Card({
				title: 'Main view card',
				items: [
					new Input({
						bind: {
							model: 'names'
						}
					}),

					new Button({
						label: 'test button',
						type: 'raised',
						listen: {
							click: function (e, dom) {
								var input = Main.find('sibling:input', dom, true);
								var v = input.dom.val();
								var store = Main.Stores.get('mainStore');
								var randId = Math.floor(Math.random()*62);
								store.data.insert(randId, [randId, v, Main.util.newHash(5)])
							}
						}
					}),

					new Label({
						bind: {
							to: 'names'
						}
					})
				]
			}),

			new Card({
				items: [
					new TableGrid({
						data: 'mainStore'
					})
				]
			})
		]
	})

})