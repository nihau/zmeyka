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
