function WindowFocus () {
	this.isActive = true;

	this.init();
}

WindowFocus.prototype.init = function () {

	window.onfocus = function () { 
	  this.isActive = true;

	}.bind(this);

	window.onblur = function () { 
	  this.isActive = false;

	}.bind(this);

};

Main.windowFocus = new WindowFocus();