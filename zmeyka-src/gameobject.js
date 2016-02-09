var GameObject = function(p, color) {
	this.point = p instanceof Point ? p : new Point(0, 0);
	this.color = color + "" === color ? color : 'black';

	this.onPickup = new CustomEvent();	
};

GameObject.prototype.consume = function() { this.onPickup.dispatchEvent(); }

//inherit from gameobject
var Bonus = function(p) {
	GameObject.apply(this, [p, 'pink']);
};


