function isInteger(n) {
	return n === +n && n === (n | 0);
}

function getRandomInt(max, min) {
	if (!isInteger(max))
		return;
	if (!isInteger(min))
		return getRandomInt(max, 0);
	if (max < min)
		return undefined;

	var rnd = Math.random();

	return ((rnd * (max - min)) | 0) + min;
}
var colorNameToHex = (function (){
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

	return function(colorName, undefined){
		if (colorName === colorName + ""){
			return colours[colorName];
		}
		
		return undefined;
	}
})();
function isInteger(n) {
	return n === +n && n === (n | 0);
}

Array.prototype.contains = function(item) {
	return this.indexOf(item) !== -1 
}

Array.prototype.first = function (item) {
	if (item === undefined) {
		return this[0];
	} else if (typeof(item) === 'function') {
		item(this[0]);
	}	

	this[0] = item;
}

Array.prototype.last = function (item) {
	if (item === undefined) {
		return this[this.length - 1];
	} else if (typeof(item) === 'function') {
		item(this[this.length - 1]);
	}

	this[this.length - 1] = item;
}

function interval(func, delay, times, callInstantly) {
	if (typeof(func) !== 'function') {
		throw 'invalid function';
	}

	if (!isInteger(delay)) {
		delay = 1000;
	}

	if (!isInteger(times)) {
		times = 1;
	}
	
	if (typeof(callInstantly) !== 'boolean') {
		callinstatly = false;
	}

	var timesCalled = 0;

	var f = function() {
		if (timesCalled === 0 && callInstantly === true) {
			timesCalled++;

			func();
		}
		if (timesCalled < times) {
			timesCalled++;

			setTimeout(function () { func(); f(); }, delay);

		}
	}

	f();
}
var Point = function(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.clone = function() { return new Point(this.x, this.y) }

Point.prototype.equalsTo = function(p) { return (this.x === p.x) && (this.y === p.y); }



var CustomEvent = function(){
	var listeners = [];

	return {
		subscribe : function (listener) {
			if (typeof(listener) !== 'function')
				return;
			listeners.push(listener);
		},

		dispatch : function (_args) {
			for (var i = 0; i < listeners.length; i++) {
				listeners[i](_args);
			}
		}
	};
};

CustomEvent.create = function() { return new customEvent(); };

var c1 = new CustomEvent();
c1.subscribe(function(){console.log('1')});
var c2 = new CustomEvent();
c2.subscribe(function(){console.log('2')});


c1.dispatch();
var Notifyable = function() {
	this.valueChanged = new CustomEvent();

	this.oldValue  = undefined;
	this.value = undefined;

	this.setValue = function(value) { 
		this.oldValue = this.value;
		this.value = value;

		this.valueChanged.dispatch( { oldValue: this.oldValue, newValue : this.value } );
	};

	this.getValue = function() {
		return value;
	};
};
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


var speed = 0.01;
var score = new Notifyable();

var activeBonus = null;
var newGameObject = new CustomEvent();

function gameStart() {
	score = 0;
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

	bonus.onPickup.subscribe(function() { score.setValue(score.getValue()+1); }); 
}

document.body.onkeydown = onKeyDown;

function onKeyDown(keyEvent) {
	var keyPressed = keyEvent.keyCode | keyEvent.which;
	var direction;
	switch (keyPressed) {
		//up
		case 38:
			direction = 'up';
			break;
		//right
		case 39:
			
			direction = 'right';
			break;
		//left
		case 37:
			direction = 'left';
			break;
		//down
		case 40:
			direction = 'down';
			break;
		default:
			console.log(keyPressed);
	}
	if (direction !== undefined)
		snake.changeDirection(direction);
}


gameStart();
var canvas = document.getElementById('myCanvas'); 
var scoreParagraph = document.getElementById('score');

canvas.height = 300;
canvas.width = 300;

var pixelWidth = canvas.width / boardWidth;
var pixelHeight = canvas.height / boardHeight;

var lineThickness = 1;
	
var ctx = canvas.getContext("2d");

var wPixelsCount = canvas.height/pixelWidth;
var hPixelsCount = canvas.height/pixelHeight;

//drawGrid
(function(){
	ctx.beginPath();

	for (var i = 0; i <= wPixelsCount; i++) {
		ctx.moveTo(i * pixelWidth, 0);
		ctx.lineTo(i * pixelWidth, canvas.height);
	}	
	
	for (var j = 0; j <= hPixelsCount; j++) {
		ctx.moveTo(0, j * pixelHeight);
		ctx.lineTo(canvas.width, j * pixelHeight);		
	}
	
	ctx.stroke();
})();


var paintBlock = function(x, y, color){
	if (x >= wPixelsCount || x < 0
	 || y >= hPixelsCount || y < 0)	
		return;
	
	color = (color || 'white') + "";
	var d = lineThickness;

	ctx.fillStyle = colorNameToHex(color); 
	ctx.fillRect(x * pixelWidth  + d,
				 y * pixelHeight + d,
				 	 pixelWidth  - d * 2,
					 pixelHeight - d * 2);	
};
				
board.invalidateEvent.subscribe(function(o) {
	paintBlock(o.x, o.y, o.gameObject.color);	
});

score.valueChanged.subscribe(function(deltaArgs) {
	scoreParagraph.innerText = deltaArgs.newValue;
});
