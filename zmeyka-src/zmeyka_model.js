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

Bonus.prototype = Object.create(GameObject.prototype);

var snake = (function() {
	var result = {};
	var directions = ['left', 'up', 'right', 'down'];
	var length = 3;
	var body = [];

	var move = function(deltaP) {
		var newP = body.last().clone();

		newP.x += deltaP.x;
		newP.y += deltaP.y;

		if (newP.x < 0 || newP.x >= board.width
		 || newP.y < 0 || newP.y >= board.height) {
			gameLose();
		} else {
			body.shift();
			body.push(newP);
		}
	};

	var direction = 'right';

	result.invalidateEvent = new CustomEvent();

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
		var deltaP = new Point(0, 0);

		switch (direction) {
			case 'right':
				deltaP.x = 1;	
				break;
			case 'left':
				deltaP.x = -1;	
				break;
			case 'up':
				deltaP.y = -1;	
				break;
			case 'down':
				deltaP.y = 1;	
				break;
			default:
				throw 'what the fuck is wrong with direction?';
		}

		move(deltaP);

		this.invalidateEvent.dispatch(body);
	};

	result.reset = function() {
		
		for (var i = 0; i < length; i++) {
			body[i] = new Point(i, 0);
		}

		this.direction = 'right';
	};

	return result; 
})();

var activeBonus = null;
var newGameObject = new CustomEvent();

function gameStart() {
	board.clear();
	snake.reset();
};

function tick() {
	snake.move();

	snake.invalidateEvent.subscribe(function (body) {
		if (body.last().equalsTo(activeBonus)) {
			activeBonus.consume();
		}
	});

	if (activeBonus === null) {
		activeBonus = new Bonus(new Point(getRandomInt(board.width), getRandomInt(board.height)));
		newGameObject.dispatch(activeBonus);

		activeBonus.onPickup.subscribe(function () { activeBonus = null; });
	}
};

