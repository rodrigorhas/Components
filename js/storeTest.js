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

/*store.onupdate.listen(function (changes) {
	console.log(changes)
})
*/

for (var i = 0; i < 500; i++) {
	store.insert({name: Hash().slice(3), hash: Hash(2)})
};

/*var data = store.select('name').where(function (row) {
	if(row.hash.indexOf('A') > -1) {
		return true;
	}
});*/


// 50 milions -> ~= unknow (crash the page, cuz use all available memory)
// 5 milions  -> ~= 23s
// 500 mil    -> ~= 2.42s
// 50 mil     -> ~= 260ms
// 5 mil      -> ~= 39ms
// 500        -> ~= 13ms
// 50         -> ~= 8ms
// 5          -> ~= 7ms