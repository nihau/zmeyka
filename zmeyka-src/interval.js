var Interval = function (func, delay, times, callInstantly) {
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
	var lastLoop;

	var f = function() {
		if (timesCalled === 0 && callInstantly === true) {
			timesCalled++;

			func();
		}
		if (timesCalled < times) {
			timesCalled++;

			lastLoop = setTimeout(function () { func(); f(); }, delay);

		}
	}

	f();

	this.stop = function() {
		clearTimeout(lastLoop);
	}
}
