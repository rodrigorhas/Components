/*

	model -> quando criado ele vira um store que observa os seus items

	view -> quando criada recebe listeners de alteraçoes do model (caso tenha alguma ocorrencia),
			e atualiza o dom. [responsavel por interagir com o dom];

	controller -> recebe os listeners da view, e interage diretamente como model
			     quando o controller da um notify(), ele interage como model
			     que por sua vez atualiza a view

*/

var StoreManager = new StoreManager();

var todo = StoreManager.add("todo");

todo
	.addColumn({
		name: 'id',
		type: 'int'
	})
	.addColumn({
		name: 'job',
		type: 'string'
	})
	.addColumn({
		name: 'name',
		type: 'string'
	});

todo.createRow({
	id: 20,
	job: 'Programmer',
	name: 'Rodrigo'
});

console.log(todo);