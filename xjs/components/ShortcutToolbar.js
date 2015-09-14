function ShortcutToolbar (options) {
	this.options = options;

	if(isset(this.init)) this.init({
		before: true,
		after: true
	});
}

ShortcutToolbar.extend(BaseComponent);

ShortcutToolbar.prototype.html = '<div class="ShortcutToolbar"></div>';
ShortcutToolbar.prototype.before = function (dom) {
	var __this = this;
	if(isset(this.items)) {
		
		X.ArrayObserve(this.items, function (changes) {
			var c = changes[0];
			if(c.addedCount){
				var o = c.object[c.index].html;
				if(isset(o)) o.appendTo(__this.html)
			}else{
				var o = c.removed[c.index];
				if(isset(o)) {
					c.removed[c.index].html.remove();

					if(!c.object.length) {
						__this.html.remove();
					}
				}
			}

		});
	}

}

ShortcutToolbar.prototype.after = function (dom) {
	dom.appendTo('.view'); // js hack to make an static class ShortcutToolbar
}