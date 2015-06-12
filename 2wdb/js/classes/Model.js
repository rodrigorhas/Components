function Model (id, fields) {
	this.fields = (fields) ? fields : [];
}

Model.prototype.getFieldValue = function(field) {
	return this.fields[field];
};