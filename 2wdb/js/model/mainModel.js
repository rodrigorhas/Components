function BlaModel (id, values) {

	this.id = id;
	this.fields = [
		{name: 'ID'},
		{name: 'Name'},
		{name: 'Job'}
	]

	this.values = values;

	return {id: id, fields: this.fields, values: this.values};
}

BlaModel.extend(Model);