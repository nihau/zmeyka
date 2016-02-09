var GameObject = function(color) {
	this.color = color + "" === color ? color : 'black';

	this.onPickup = new CustomEvent();	
};

	GameObject.prototype.consume = function() { this.onPickup.dispatch(); };

//inherit from gameobject
var Bonus = function() {
	GameObject.call(this, 'pink');
};

Bonus.prototype = Object.create(GameObject.prototype);

var voidObject = new GameObject('white');
voidObject.prototype = Object.create(GameObject.prototype);

var snakeHead = new GameObject('green');
snakeHead.prototype = Object.create(GameObject.prototype);

var snakeTail = new GameObject('darkgreen');
snakeHead.prototype = Object.create(GameObject.prototype);
