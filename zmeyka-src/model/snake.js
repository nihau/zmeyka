var snake = (function() {
	var result = {};
	var directions = ['left', 'up', 'right', 'down'];
	var body = [];

	var move = function(deltaP) {
		var newP = body.last().clone();
		var oldP;
		moveInitialDirection = direction;

		newP.x += deltaP.x;
		newP.y += deltaP.y;

		if (newP.x < 0 || newP.x >= board.width
		 || newP.y < 0 || newP.y >= board.height) {
			gameLose();
		} else {
			oldP = body.first();

			if (body.length === result.length)
				body.shift();

			body.push(newP);
		}

		return oldP;
	};

	var direction = 'right';
	var moveInitialDirection = direction;
	

	result.moveEvent = new CustomEvent();

	result.length = 3;

	result.changeDirection = function(newDirection) {
		if(Math.abs (directions.indexOf(newDirection) - directions.indexOf(moveInitialDirection)) === 2) {
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
		var length = this.length;
		for (var i = 0; i < length; i++) {
			body[i] = new Point(i, 0);
		}

		this.direction = 'right';
	};

	return result; 
})();
