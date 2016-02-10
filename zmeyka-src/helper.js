function isInteger(n) {
	return n === +n && n === (n | 0);
}

Array.prototype.contains = function(item) {
	return this.indexOf(item) !== -1 
}

Array.prototype.first = function (item) {
	if (item === undefined) {
		return this[0];
	} else if (typeof(item) === 'function') {
		item(this[0]);
	}	

	this[0] = item;
}

Array.prototype.last = function (item) {
	if (item === undefined) {
		return this[this.length - 1];
	} else if (typeof(item) === 'function') {
		item(this[this.length - 1]);
	}

	this[this.length - 1] = item;
}

Array.prototype.remove = function (item) {
	var index = this.indexOf(item);

	if (index < 0) {
		this.splice(index, 1);
	}

	return index;		
}

Array.prototype.removeAll = function (item) {
	var index = -1; 

	do {
		index = this.remove(item);
	} while (index >= 0)
}

function interval(func, delay, times, callInstantly) {
	if (typeof(func) !== 'function') {
		throw 'invalid function';
	}

	if (!isInteger(delay)) {
		delay = 1000;
	}

	if (!isInteger(times)) {
		times = 1;
	}
	
	if (typeof(callInstantly) !== 'boolean') {
		callinstatly = false;
	}

	var timesCalled = 0;

	var f = function() {
		if (timesCalled === 0 && callInstantly === true) {
			timesCalled++;

			func();
		}
		if (timesCalled < times) {
			timesCalled++;

			setTimeout(function () { func(); f(); }, delay);

		}
	}

	f();
}
