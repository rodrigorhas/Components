function Notify () {
	this.created = [];
	this.support = false;

	this.checkAvail();
}

Notify.prototype.checkAvail = function () {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {
    this.support = true;
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
      	this.support = true;
      }
    }.bind(this));
  } else {
  	this.support = false;
  }
}

Notify.prototype.create = function (options) {
	if (!this.support) throw Error('Missing options property on notification');

	if(this.support) {
		var t = options.title;
		delete options.title;

		var n = new Notification(t, options);
		this.created.push(n);

		return n;
	}
}

Main.NotificationManager = new Notify();