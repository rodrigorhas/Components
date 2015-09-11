if ( $ ) {
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
}

var isBool = function (t) {
	return (typeof t === 'boolean') ? true : false;
}

var isObject = function (t, literally) {
	return (literally) ? testType(t, "Object") : (typeof t === 'object') ? true : false;
}

var isArray = function (t) {
	return testType(t, "Array");
}

var isNumber = function (t) {
	return (typeof t === 'number') ? true : false;
}

var isString = function (t) {
	return (typeof t === 'string') ? true : false;
}

var isUndefined = function (t) {
	return (typeof t === 'undefined') ? true : false;
}

var isNull = function (t) {
	return (typeof t === 'null') ? true : false;
}

var isFunction = function (t) {
	return (typeof t === 'function') ? true : false;
}

var testType = function (t, value) {
	return ({}.toString.call(t).indexOf(String(value)) == -1) ? false : true;
}

var capitalize = function (t) {
	if(!t.length) return;
	if(t.length == 1) return t.toUpperCase ();

	return t[0].toUpperCase() + t.slice(1);
}

var lastOf = function (arr) {
	return (arr.length) ? arr[arr.length -1] : arr;
}

function Hash (L){
	if(!isset(L)) L = 10;
    var s= '';
    var randomchar=function(){
    	var n= Math.floor(Math.random()*62);
    	if(n<10) return n; //1-10
    	if(n<36) return String.fromCharCode(n+55); //A-Z
    	return String.fromCharCode(n+61); //a-z
    }
    while(s.length< L) s+= randomchar();
    return s;
}