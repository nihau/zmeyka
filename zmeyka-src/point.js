var Point = {
	create: function(x, y) {
		var point = Object.create(this);

		point.x = x;
		point.y = y;

		return point;
	},

	clone: function() {
		var point = Object.create(this);

		point.x = this.x;
		point.y = this.y;
	}
};




