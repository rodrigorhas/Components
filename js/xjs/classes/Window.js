function Window (options) {
	this.options = options;

	this.init({
		before: true,
		after: true
	});
}

Window.extend(BaseComponent);

Window.prototype.html = '<div class="window"><div class="inside-shadow"><div class="content"><div class="handler"></div></div></div></div>';

Window.prototype.close = function () {
	var dom = this.html;
	
	dom.remove();

	console.debug('window closed and removed')
}

Window.prototype.before = function (dom){
	$this = this;
	var c = (this.containment) ? this.containment : 'body';

	max = 0;

	$('.window').each(function() {
		var z = parseInt( $( this ).css( "z-index" ), 10 );
		max = Math.max( max, z );
	});
		
	dom.css("z-index", max + 2 );

	var bgs = '.handler .btn-group',
	bgo = dom.find(bgs);
	bgo.disableSelection();

	dom.draggable({
		handle: dom.find('.handler'),
		stack: '.window',
		containment: c,
		cancel: bgs,

		start: function (e, ui) {
			ui.helper.addClass('moved');
		}
	}).css('position', 'absolute');

	dom.resizable({
		minHeight: 38,
		minWidth: 300
	});

	this.listen = {};

	this.listen.click = function (e, target) {
	    var widget = dom.data('ui-draggable');
	    widget._mouseStart(event);
	    widget._mouseDrag(event);
	    widget._mouseStop(event);   
	}

	dom.find('.handler').append('<div class="btn-group"></div>');  // add the btn-group for else case

	if(this.toolbarButtons) {

		if(this.toolbarButtons.minimize){
			dom.find(bgs).append('<span class="icon icon-minus"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,13H5V11H19V13Z" /></svg></span>');
		}

		if(this.toolbarButtons.close){
			var close = dom.find(bgs).append('<span class="icon icon-close"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></span>');
			dom.find(bgs + ' .icon-close').on('click', function (){
				$this.close();
			});
		}

		if(this.toolbarButtons.full){
			dom.find(bgs).append('<span class="icon icon-full"><svg viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg></span>');
		}
	} else { // add only close button
		var close = dom.find(bgs).append('<span class="icon icon-close"><svg viewBox="0 0 24 24"><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></span>');
		close.on('click', function (){
			$this.close();
		});
	}

	if(this.title) {
		dom.find('.handler').prepend('<span class="title">' + this.title +'</span>');
	}
}

Window.prototype.after = function (dom) {
	dom.appendTo('.view'); // js hack to make an static class Window
}