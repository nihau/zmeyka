var CustomEvent = function(parentEvent){
	var listeners = [];
	var that = this;

	this.subscribe = function (listener) {
		if (typeof(listener) !== 'function')
			return;
		listeners.push(listener);
	};

	this.unsubscribe = function (listener) {
		if (typeof(listener) !== 'function')
			return;

		listeners.remove(listener);
	};

	this.clearSubscribers = function () {
		listeners = [];
	};

	this.dispatch = function (_args) {
		for (var i = 0; i < listeners.length; i++) {
			listeners[i](_args);
		}
	};

	if (parentEvent instanceof CustomEvent) {
		parentEvent.subscribe(function(_args) { that.dispatch(_args); });
	}
};

CustomEvent.create = function() { return new customEvent(); };

var c1 = new CustomEvent();
c1.subscribe(function(){console.log('1')});
var c2 = new CustomEvent();
c2.subscribe(function(){console.log('2')});


c1.dispatch();
