// Util function
function Hash(n){n||(n=10);for(var t="",r=function(){var n=Math.floor(62*Math.random());return 10>n?n:String.fromCharCode(36>n?n+55:n+61)};t.length<n;)t+=r();return t}var isBool=function(n){return"boolean"==typeof n?!0:!1},isObject=function(n,t){return t?testType(n,"Object"):"object"==typeof n?!0:!1},isArray=function(n){return testType(n,"Array")},isNumber=function(n){return"number"==typeof n?!0:!1},isFunction=function(n){return"function"==typeof n?!0:!1},isUndefined=function(n){return"undefined"==typeof n?!0:!1},isString=function(n){return"string"==typeof n?!0:!1},testType=function(n,t){return-1=={}.toString.call(n).indexOf(String(t))?!1:!0},lastOf=function(n){return isArray(n)?n.length?n[n.length-1]:null:void console.warn("using lastOf with no array type")},capitalize=function(n){return n.length?1==n.length?n.toUpperCase():n[0].toUpperCase()+n.slice(1):void 0};

var require = function ( data, callback ) {

	callback = (callback) ? callback : function () {};

	if(isArray(data)) {
		var promises = [];

		data.forEach(function (u) {
			promises.push(request(u));
		});

		Promise.all(promises).then(callback);
	}

	else if ( isString(data) ) {
		request(data).then(callback);
	}

	function request ( url ) {
		return new Promise(function (resolve, reject) {
			var type = url.match(/.(\w+)$/ig);

			if ( !type ) return reject('type not found');

			type = type[0];

			var node;

			switch ( type ) {
				case '.js':
				node = document.createElement('script');
				node.src = url;
				break;

				case '.css':
				node = document.createElement('link');
				node.rel = "stylesheet";
				node.href = url;
				break;

				default:
				reject(Error('Type not supported'))
				break;
			}

			node.onload = function () {
				resolve();
			}

			node.onerror = function (e) {
				reject(Error(e));
			}

			document.body.appendChild(node);
		})
	}
}