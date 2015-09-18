// Util function
function Hash(n){n||(n=10);for(var t="",r=function(){var n=Math.floor(62*Math.random());return 10>n?n:String.fromCharCode(36>n?n+55:n+61)};t.length<n;)t+=r();return t}var isBool=function(n){return"boolean"==typeof n?!0:!1},isObject=function(n,t){return t?testType(n,"Object"):"object"==typeof n?!0:!1},isArray=function(n){return testType(n,"Array")},isNumber=function(n){return"number"==typeof n?!0:!1},isFunction=function(n){return"function"==typeof n?!0:!1},isUndefined=function(n){return"undefined"==typeof n?!0:!1},isString=function(n){return"string"==typeof n?!0:!1},testType=function(n,t){return-1=={}.toString.call(n).indexOf(String(t))?!1:!0},lastOf=function(n){return isArray(n)?n.length?n[n.length-1]:null:void console.warn("using lastOf with no array type")},capitalize=function(n){return n.length?1==n.length?n.toUpperCase():n[0].toUpperCase()+n.slice(1):void 0};

/*var require = function ( data, callback ) {

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
}*/

var require = function (data, callback) {

	var appPath = location.pathname.slice(0, location.pathname.length - 1);
	var path = null;
	var pipe = data || [];
	var loaded = [];
	var _this = this;

	if( !pipe.length ) {

		console.warn('No assets to be loaded');
		return callback ();
	}

	var count = 1;

	function recursiveLoad () {

		if(count <= pipe.length) {

			var curr = count - 1;

			var url = pipe[curr];

			if(url) {
				loadScript({
					url: pipe[curr],

					callback: function () {
						count ++;

						if(count <= pipe.length) {
							recursiveLoad();
						} else {
							callback();
						}
					}
				});
			}
		}
	}

	function loadScript (config) {

		var callback = config.callback,
			url = config.url,
			extension = config.url.match(/.(\w+)$/ig)[0],
			tag,
			appendToBody = false,
			body = document.body,
			head = document.getElementsByTagName('head')[0];

		switch (extension) {
			/*case '.json':
			var xhr = new XMLHttpRequest(), json, done = false;

			var interval = setInterval(function () {
				if(done) {
					config.callback();
					clearInterval(interval);
				}
			},20);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					json = JSON.parse(xhr.responseText);

					if(!_this.cachedAssets.loaded) _this.cachedAssets.loaded = [];
					if(!_this.cachedAssets.json) _this.cachedAssets.json = {};

					_this.cachedAssets.loaded.push(url);
					_this.cachedAssets.json[config.url+extension] = json;

					done = true;
				}
			}

			xhr.open('GET', url, true);
			xhr.send(null);
			break;*/

			case '.js':
			tag = document.createElement('script');
		    tag.type = 'text/javascript';
		    tag.src = url;
			break;

			case '.css':
			tag = document.createElement('link');
		    tag.rel = 'stylesheet';
		    tag.href = url;
			break;

			/*case ((".jpg|.png|.bmp|.jpeg".indexOf(extension) != -1) ? extension : false):
				tag = new Image ();
				tag.onload = function () {
					_this.assets[name] = this;
					delete tag;
					callback ();
				}
				tag.src = url;
				appendToBody = null;
			break;*/

			default:
			return console.error('Type not suported -> ' + extension);
			break;
		}

		if (tag) {
		    tag.onload = (tag.onload) ? tag.onload : callback;
		    tag.onerror = (tag.onerror) ? tag.onerror : callback;

		    switch (appendToBody) {
				case false:
	    		head.appendChild(tag);
				break;

				case true:
	    		body.appendChild(tag);
				break;
			}
		}
	}
	recursiveLoad();
}