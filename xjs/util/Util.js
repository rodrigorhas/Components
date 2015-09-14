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

var isFunction = function (t) {
	return (typeof t === 'function') ? true : false;
}

var isUndefined = function (t) {
	return (typeof t === 'undefined') ? true : false;
}

var isString = function (t) {
	return (typeof t === 'string') ? true : false;
}

var testType = function (t, value) {
	return ({}.toString.call(t).indexOf(String(value)) == -1) ? false : true;
}

var lastOf = function (arr) {
	if ( isArray(arr) ) {
		if ( arr.length ) {
			return arr[arr.length-1];
		}

		else {
			return null;
		}
	}

	else {
		console.warn('using lastOf with no array type');
	}
}

var capitalize = function (t) {
	if(!t.length) return;
	if(t.length == 1) return t.toUpperCase ();

	return t[0].toUpperCase() + t.slice(1);
}

function Hash (L){
	if(!L) L = 10;
    var s= '';
    var randomchar=function(){
    	var n= Math.floor(Math.random()*62);
    	if(n<10) return n;
    	if(n<36) return String.fromCharCode(n+55);
    	return String.fromCharCode(n+61);
    }
    while(s.length< L) s+= randomchar();
    return s;
}