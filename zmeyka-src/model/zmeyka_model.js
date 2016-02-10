var Model = function () {
	var speed = 0.001;
	var score = new Notifyable(0);

	this.newGameObject = new CustomEvent();
	this.invalidateEvent = new CustomEvent(board.invalidateEvent);
	this.scoreChanged = new CustomEvent(score.valueChanged);

	var bonusTracker = {
		lastBonus: undefined,
		placeBonus: function() {
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
	};


	this.gameStart = function () {
		score.setValue(0); 
		board.clear();
		snake.reset();

		interval(tick, (1 / speed), 9999, true);

		interval(bonusTracker.placeBonus, (50 / speed), 9999, true);
	}

	snake.moveEvent.subscribe(function(deltaArgs){
		board.setObjectAtPoint(deltaArgs.oldPoint, voidObject);

		for(var i=0; i<deltaArgs.body.length; i++) {
			board.setObjectAtPoint(deltaArgs.body[i], snakeTail);
		}

		board.setObjectAtPoint(deltaArgs.newPoint, snakeHead);
	});

	function tick() {
		snake.move();
	}
};
