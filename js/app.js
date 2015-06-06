X.init({
	requires: ['Viewport', 'Toolbar','Button', 'Card', 'Container','Label', 'PageDivider', 'TableGrid', 'Checkbox', 'Input', 'Window']
});

$(document).on('x-ready', function () {

	new Viewport({
		items: [

			new Toolbar({
				items: [
					new Button({
						label: 'Cadastro',
						listen: {
							click: function (e) {
								new Window({
									toolbarButtons: {
										close: true,
										minimize: true
									},
									
									title: 'Cadastro de Favorecidos'
								})
							}
						}
					}),
					new Button({
						label: 'Movimentação',
						listen: {
							click: function (e) {
								new Window({
									toolbarButtons: {
										close: true,
										minimize: true
									},
									
									title: 'Movimentação'
								})
							}
						}
					}),
					new Button({
						label: 'Lançamentos',
						listen: {
							click: function (e) {
								new Window({
									toolbarButtons: {
										close: true,
										minimize: true
									},
									
									title: 'Lançamentos'
								})
							}
						}
					}),
					new Button({
						label: 'ferramentas',
						state: 'disabled'
					})
				]
			}),

			new Container({
				class: 'mgt',
				items: [

					new PageDivider({
						label: 'Home'
					}),

					new Card({
						class: 'no-padd',
						items: [

							new TableGrid({
								data: '{"fields":[{"name":"ID","type":"int"},{"name":"Nome","type":"string"},{"name":"Tipo","type":"string"}],"lines":[[1,"Vinicius Hacebe","Fornecedor"],[2,"Rodrigo","Cliente"],[3,"Alan","Fornecedor"],[4,"Brand\u00e3o","Cliente"]]}'
							})
						]
					}),

					new PageDivider({
						label: '2WDB example'
					}),

					new Card({
						items: [
							new Input({
								bind: {
									name: 'name',
									value: {
										name: '2WDB Worth :D'
									}
								}
							}),

							new Label({
								bind: {
									to: 'name'
								}
							})
						]
					})

				]
			})

		]
	});

	/*X.create('Viewport', {
		items: [
			{
				type: 'Toolbar',
			},

			{
				type: 'Container',
				items: [
					{
						type: 'Button',
						label: 'New Button'
					}
				]
			}
		]
	})*/

})