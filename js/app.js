X.init({
	requires: ['Viewport', 'Toolbar','Button', 'Card', 'Container','Label', 'PageDivider', 'TableGrid', 'Checkbox', 'Input', 'Window']
});

$(document).on('x-ready', function () {

	new Viewport({
		items: [

			new Toolbar({
				items: [
					new Button({
						label: 'Cadastrar',
						listen: {
							click: function (e) {
								new Window({
									toolbarButtons: {
										close: true,
										minimize: true,
										fullscreen: true
									},
									items: [
										new TableGrid({
											data: '{"fields":[{"name":"ID","type":"int"},{"name":"Nome","type":"string"},{"name":"Tipo","type":"string"}],"lines":[[1,"Vinicius Hacebe","Fornecedor"],[2,"Rodrigo","Cliente"],[3,"Alan","Fornecedor"],[4,"Brand\u00e3o","Cliente"]]}'
										})
									],
									
									title: 'Cadastro de Alunos'
								})
							}
						}
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
					})

				]
			})

		]
	});

})