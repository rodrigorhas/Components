function Event(sender) {
    this.listeners = [];
}

Event.prototype = {
    listen: function (listener) {
        this.listeners.push(listener);
    },

    trigger: function () {
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i].apply(null, arguments);
        };
    },

    unbind: function () {
        this.listeners = [];
    }
};