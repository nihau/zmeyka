var snake = (function() {
	var result = {};
	var directions = ['left', 'up', 'right', 'down'];
	var length = 3;
	var body = [];

	var move = function(deltaP) {
		var newP = body.last().clone();
		var oldP;

		newP.x += deltaP.x;
		newP.y += deltaP.y;

		if (newP.x < 0 || newP.x >= board.width
		 || newP.y < 0 || newP.y >= board.height) {
			gameLose();
		} else {
			oldP = body.first();
			body.shift();
			body.push(newP);
		}

		return oldP;
	};

	var direction = 'right';

	result.moveEvent = new CustomEvent();

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

		oldP = move(deltaP);

		this.moveEvent.dispatch({
			newPoint: body.last(),
			oldPoint: oldP,
			body: body
		});
	};

	result.reset = function() {
		
		for (var i = 0; i < length; i++) {
			body[i] = new Point(i, 0);
		}

		this.direction = 'right';
	};

	return result; 
})();
