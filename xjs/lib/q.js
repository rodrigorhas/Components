(function () {

	var Selector = function (dom) {
		this.dom = dom;
	}

	Selector.prototype.find = function ( query ) {
		return q(query);
	}

	Selector.prototype.remove = function ( query ) {
		for (var i = 0; i < this.dom.length; i++) {
			this.dom[i].parentNode.removeChild(this.dom[i]);
		}
	}

	var q = function (el) {
		if(!el) return;

		var dom;

		if(el.innerHTML) {

			dom = el;
		}

		else {

			dom = document.querySelectorAll(el);
		}

		return new Selector(dom);
	}

	window.q = q;

})();