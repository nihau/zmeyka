var Controller = function(model, view) {
	document.body.onkeydown = onKeyDown;

	function onKeyDown(keyEvent) {
		var keyPressed = keyEvent.keyCode | keyEvent.which;
		var direction;
		switch (keyPressed) {
			//enter
			case 13:
				model.gameStart();
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
};
