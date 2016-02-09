var canvas = document.getElementById('myCanvas'); 

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
				
snake.invalidateEvent.subscribe(function(body) {
	for (var i = 0; i < wPixelsCount; i++) {
		for (var j = 0; j < hPixelsCount; j++) {
			paintBlock(i, j, 'white');
		}
	}

	for (var i = 0; i < body.length - 1; i++) {
		paintBlock(body[i].x, body[i].y, 'green');
	}
	
	paintBlock(body[i].x, body[i].y, 'red');
});

newGameObject.subscribe(function(gameObject) {
	var point = gameObject.point;

	paintBlock(point.x, point.y, gameObject.color);

	gameObject.onPickup.subscribe(function() { paintBlock(point.x, point.y, 'white') });
});
