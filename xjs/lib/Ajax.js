var Ajax = (Ajax) ? Ajax : function ( config ) {
	if(!config) return null;

	var url = config.url || false,
		data = config.data || '',
		requestType = config.type || 'GET',

		json = config.json || false,

		success = config.success || function () {},
		fail = config.fail || function () {},
		progress = config.progress || function () {},

		stringify = function ( obj ) {
			var s = '?',
				c = 0,
				sp = '&';

			for (var key in obj) {

				++c;
				var val = obj[key];

				if(c != 1) { s = s + sp; }
				s = s + key + '=' + val;
			}

			return s;
		},

		tryParseJSON = function ( jsonString ) {
		    try {
		        var o = JSON.parse(jsonString);
		        if (o && typeof o === "object" && o !== null) {
		            return o;
		        }
		    }
		    catch (e) { }

		    return false;
		},

		request;

	if(!url) return console.error('Invalid url');

	if( window.XMLHttpRequest )
		request = new XMLHttpRequest();
	
	else
		request = new ActiveXObject("Microsoft.XMLHTTP");

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) { // success
			var response = request.responseText;

			if (json)
				response = tryParseJSON(response);

			success(response);
		}

		else if (request.readyState == 4 && request.status == 404 ) { // file not found
			fail();
			console.error('File not found');
		}
	}

	if ( requestType.toUpperCase() == "GET" ) {
		if( data )
			url += stringify( data );
	}

	request.open( requestType, url, true );

	if ( requestType.toUpperCase() == "POST" ) {

		request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
	}

	request.send( data );
}