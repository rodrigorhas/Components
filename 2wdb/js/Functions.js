$.fn.disableSelection = function() {

    return this.attr('unselectable', 'on')
       .css({'-moz-user-select':'-moz-none',
             '-moz-user-select':'none',
             '-o-user-select':'none',
             '-khtml-user-select':'none',
             '-webkit-user-select':'none',
             '-ms-user-select':'none',
             'user-select':'none'})
       .bind('selectstart', false);
};

var options = {console: {warning: true, debug: true, erro: true}};

function trim (string) {
	if(!isset(string)) return "";
	return string.replace(/\r\n|\n|\r/g, '<br />');
}

function $debug (debug){
	if(options.console.debug == false) return;
	for (var i = 0; i < arguments.length; i++) {
		console.debug(arguments[i]);
	};
	return "-------------- DEBUG --------------";
}

function $warn (warn){
	if(options.console.warning == false) return;
	for (var i = 0; i < arguments.length; i++) {
		console.warn(arguments[i]);
	};
	return "-------------- WARNING --------------";
}

function $error (error){
	if(options.console.error == false) return;
	for (var i = 0; i < arguments.length; i++) {
		console.error(arguments[i]);
	};
	return "-------------- ERROR --------------";
}

function isset (test) {
	if( test != undefined && test != null && test != "" )
		return true
	else
		return false;
}