var speed = 0.01;
var score;

var activeBonus = null;
var newGameObject = new CustomEvent();

function gameStart() {
	score = new Notifyable(0);
	board.clear();
	snake.reset();

	interval(tick, (1 / speed), 9999);

	interval(placeBonus, (50 / speed), 9999, true);
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

function placeBonus() {
	var bonus = new Bonus();
	board.spawnAtRandomFree(bonus);

	bonus.onPickup.subscribe(function() {
	   	score.setValue(score.getValue()+1);
		snake.length++;
   	}); 

}

