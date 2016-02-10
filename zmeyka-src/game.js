var MVC = function(Model, View, Controller) {
	if (   (typeof(Model)      !== 'function')
		|| (typeof(View)       !== 'function')
		|| (typeof(Controller) !== 'function'))
		return;

	this.model = new Model();
	this.view = new View(this.model);
	this.controller = new Controller(this.model, this.view);
};

var mvc = new MVC(Model, View, Controller);

mvc.model.gameStart();



