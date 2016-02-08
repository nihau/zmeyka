var Notifyable = {
	valueChanged: Object.create(customEvent),

	oldValue: undefined,
	value: undefined,

	setValue: function(value) { 
		this.oldValue = this.value;
		this.value = value;

		this.valueChanged.dispatch( { oldValue: this.oldValue, newValue : this.value } );
	},

	getValue: function() {
		return value;
	}
};
