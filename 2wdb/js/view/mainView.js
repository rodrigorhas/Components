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
								console.log(input.dom.val(e.timeStamp))
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
						data: Main.Stores.mainStore.getData(true)
					})
				]
			})
		]
	})

})