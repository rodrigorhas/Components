(function () {

	var Selector = function (dom) {
		this.dom = dom;
	}

	Selector.prototype.find = function ( query ) {

		return q(query);
	}

	Selector.prototype.remove = function ( query ) {
		if ( this.dom.length != undefined ) {
			for (var i = 0; i < this.dom.length; i++) {
				this.dom[i].parentNode.removeChild(this.dom[i]);
			}
		}

		else {

			console.log(this.dom);

			this.dom.parentNode.removeChild(this.dom);
		}
	}

	Selector.prototype.append = function ( el ) {
		if ( this.dom.length != undefined ) {

			for (var i = 0; i < this.dom.length; i++) {
				for (var i = 0; i < el.length; i++) {
					this.dom[i].appendChild(el[i]);
				};
			}
		}

		else {
			for (var i = 0; i < el.length; i++) {
				this.dom.appendChild(el[i]);
			};
		}
	}

	Selector.prototype.prepend = function ( el ) {
		if ( this.dom.length != undefined ) {

			for (var i = 0; i < this.dom.length; i++) {
				for (var i = 0; i < el.length; i++) {
					this.dom[i].insertBefore(el[i], this.dom[i].firstChild);
				};
			}
		}

		else {

			for (var i = 0; i < el.length; i++) {
				this.dom.insertBefore(el[i], this.dom.firstChild);
			};
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