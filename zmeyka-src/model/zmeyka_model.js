var Model = function () {
	var speed = 0.01;
	var score = new Notifyable(0);

	this.newGameObject = new CustomEvent();
	this.invalidateEvent = new CustomEvent(board.invalidateEvent);
	this.scoreChanged = new CustomEvent(score.valueChanged);

	var bonusTracker = (function() {
		var lastBonus = undefined;

		var res = {};
		res.placeBonus = function() {
			if (lastBonus === undefined) {
				var bonus = new Bonus();
				lastBonus = bonus;
				board.spawnAtRandomFree(bonus);

				bonus.onPickup.subscribe(function() {
					score.setValue(score.getValue()+1);
					snake.length++;

					lastBonus = undefined;
					bonus.onPickup.clearSubscribers();
				});
			}
		}

		return res;
	})();


	this.gameStart = function () {
		score.setValue(0); 
		board.clear();
		snake.reset();

		interval(tick, (1 / speed), 9999, true);

		interval(bonusTracker.placeBonus, (1 / speed), 9999, true);
	}

	snake.moveEvent.subscribe(function(deltaArgs){
		board.setObjectAtPoint(deltaArgs.oldPoint, voidObject);

		for(var i=0; i<deltaArgs.body.length - 1; i++) {
			board.setObjectAtPoint(deltaArgs.body[i], snakeTail);
		}

		var nP = deltaArgs.newPoint;

		board[nP.x][nP.y].consume();

		board.setObjectAtPoint(nP, snakeHead);
	});

	snakeTail.onPickup.subscribe(function() {
		gameLose();
	});

	function tick() {
		snake.move();
	}
};
