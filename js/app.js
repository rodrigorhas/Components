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
										new Input({
											class: 'block',
											placeholder: 'Nome'
										}),

										new Input({
											class: 'block',
											placeholder: 'Endereço'
										}),

										new Input({
											class: 'block',
											placeholder: 'Telefone'
										}),

										new Input({
											class: 'block',
											placeholder: 'CPF'
										}),

										new Input({
											class: 'block',
											placeholder: 'Email'
										}),

										new Button({
											label: 'cadastrar',
											type: 'raised',
											listen: {
												click: (function(e, dom){
													// x find , passa uma string do tipo <local>:<class or id>, o ultimo parametro retorna um obj {dom: dom, obj: obj}
													// o ultimo param nao é obrigatorio, ao contrario dos outros 2
													var w = X.find('parent:.window', dom, true);
													w.obj.close();
												})
											}
										})
									],
									
									title: 'Cadastro de Alunos'
								})
								X.effects.loadRipple();
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