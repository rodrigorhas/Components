Main.Stores.add({
	name: 'mainStore',
	model: Model.BlaModel,
	proxy: {
		select: '../select.json',
		insert: '../select.json',
	}
});