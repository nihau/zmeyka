var Point = function(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.clone = function() { return new Point(this.x, this.y) }

Point.prototype.equalsTo = function(p) { return (this.x === p.x) && (this.y === p.y); }



