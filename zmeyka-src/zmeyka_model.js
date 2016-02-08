var boardWidth = 15;
var boardHeight = 15;
var speed = 0.01;

var board = (function(xCount, yCount){
	var board = [];
	var	result = {
			height : yCount,
			width : xCount
		};

	for (var i = 0; i < xCount; i++) {
		board[i] = [];
		for (var j = 0; j < yCount; j++) {
			board[i][j]={};
		}
	}
	
	result.get = function (x, y){
		if (!isInteger(x)) {
			return undefined;
		};
		
		if (!isInteger(y)) {
			var i = x;
			var x = Math.floor(i / xCount);
			var y = i % xCount;
	
			return board[x][y]; 
		}

		return board[x][y];
	}

	result.clear = function () { }

	return result;
})(boardWidth, boardHeight);

var GameObject = function(p, color) {
	this.point = p instanceof Point ? p : new Point(0, 0);
	this.color = color + "" === color ? color : 'black';

	this.onPickUp = function() {
		console.log('not defined');
	}
};

//inherit from gameobject
var Bonus = function(p) {
	GameObject.apply(this, p, 'pink');
};

Bonus.prototype = Object.create(GameObject.prototype);


Bonus.onPickUp = function () {
	score++;
}

Bonus.create = function(x, y) {
	this.spawnAt(getRandomInt(board.height), getRandomInt(board.width));
}


var snake = (function() {
	var result = {};
	var directions = ['left', 'up', 'right', 'down'];
	var length = 3;
	var body = [];

	var moveX = function(deltaX) {
		var newX = body.last().x + deltaX;

		if ((newX < 0) || (newX >= board.width)) {
			gameLose();
		} else { 
			body.shift();
			body.push({ x : body.last().x + deltaX, y : body.last().y});
		}
	}
	
	var moveY = function(deltaY) {
		var newY = body.last().y + deltaY;

		if ((newY < 0) || (newY >= board.height)) {
			gameLose();
		} else { 
			body.shift();
			body.push({ x : body.last().x, y : body.last().y + deltaY});
		}
	}

	var direction = 'right';

	result.invalidateEvent = Object.create(customEvent);

	result.changeDirection = function(newDirection) {
		if(Math.abs (directions.indexOf(newDirection) - directions.indexOf(direction)) === 2) {
			console.log('invalid move');
	
			return;
		}	

		if (directions.contains(newDirection)) {
			direction = newDirection + "";
		} 
	};
	
	result.move = function() {
		switch (direction) {
			case 'right':
				moveX(1);
				break;
			case 'left':
				moveX(-1);
				break;
			case 'up':
				moveY(-1);
				break;
			case 'down':
				moveY(1);
				break;
			default:
				throw 'what the fuck is wrong with direction?';
		}

		this.invalidateEvent.dispatch({ body : body });
	};

	result.reset = function() {
		
		for (var i = 0; i < length; i++) {
			body[i] = { x : i, y : 0 }
		}

		this.direction = 'right';
	};

	return result; 
})();

function gameStart() {
	board.clear();
	snake.reset();
};

function tick() {
	snake.move();
};

