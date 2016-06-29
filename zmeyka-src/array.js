Array.prototype.contains = function(item) {
	return this.indexOf(item) !== -1 
}

Array.prototype.first = function () {
	return this[0];
}

Array.prototype.last = function (item) {
	return this[this.length - 1];
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

Array.prototype.clear = function() {
	this.Length = 0;
}
