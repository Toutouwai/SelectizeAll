Selectize.define('custom_change', function(options) {
	this.onChange = function() {
		// Don't trigger change on original select (i.e. do nothing in this method)
	};
});
