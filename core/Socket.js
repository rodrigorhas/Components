function Socket (object) {
	this._connections = {};
	this._currentConnection;
}

Socket.prototype = {
	connect: function (name, ip) {
		this._connections[name] = io.connect(ip);
	},

	getSocket : function (socket) {
		if(socket in this._connections) {
			return this._connections[socket];
		}

		return null;
	}
}

Main.SocketManager = new Socket();