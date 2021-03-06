var View = function(model) {
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
					
	model.invalidateEvent.subscribe(function(o) {
		paintBlock(o.x, o.y, o.gameObject.color);	
	});

	model.scoreChanged.subscribe(function(deltaArgs) {
		scoreParagraph.innerText = deltaArgs.newValue;
	});
};
