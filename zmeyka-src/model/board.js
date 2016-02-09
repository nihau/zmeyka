var boardWidth = 15;
var boardHeight = 15;

var board = (function(xCount, yCount){
	var board = [];
	board.height = yCount;
	board.width = xCount;

	board.clear = function() {
		for (var i = 0; i < xCount; i++) {
			board[i] = [];
			for (var j = 0; j < yCount; j++) {
				board[i][j]= voidObject;
			}
		}
	};

	board.clear();

	board.invalidateEvent = new CustomEvent();

	board.getFreePoint = function() {
		var x = y = 0;

		do {
			x = getRandomInt(this.width),
			y = getRandomInt(this.height);

		} while (board[x][y] !== voidObject)

		return new Point(x, y);
	};
	
	board.setObjectAtPoint = function(p, gameObject) {
		this.setObjectAtXY(p.x, p.y, gameObject); 
	};

	board.spawnAtRandomFree = function(gameObject) {
		var fP = this.getFreePoint();

		board.setObjectAtPoint(fP, gameObject);
	};

	board.setObjectAtXY = function(x, y, gameObject) {
		board[x][y].consume();

		board[x][y] = gameObject;

		this.invalidateEvent.dispatch({
			x: x,
			y: y,
			gameObject: gameObject
		});
	};

	return board;
})(boardWidth, boardHeight);


