(function($) {

	$(document).ready(function() {

		// When element focused
		$(document).on('focusin', function(event) {

			// If target is a valid select
			var $target = $(event.target);
			if($target.is('.sa-selectize select:not([multiple])')) {

				// Init Selectize
				var select_height = $target.outerHeight();
				var select_width = $target.outerWidth();
				var select_value;
				$target.removeClass('uk-select uk-form-small').selectize({
					allowEmptyOption: true,
					onInitialize: function() {
						// Set height and width to match replaced select
						this.$control.css({
							'height': select_height + 'px',
							'width': select_width + 'px',
						});
					},
					onType: function(str) {
						// Fix highlight bug: https://github.com/selectize/selectize.js/issues/1141
						str || this.$dropdown_content.removeHighlight();
					},
					onDropdownOpen: function() {
						// Get the existing selected value
						select_value = this.getValue();
						// If no existing value, clear so that typing will filter
						if(!select_value) this.clear(false);
					},
					onBlur: function() {
						// Check if this select has an empty option
						empty_option = false;
						var option_values = Object.keys(this.options);
						if(option_values.indexOf('') !== -1) empty_option = true;
						// Trying to set an empty value to a select that doesn't have an empty option
						if(!empty_option && this.getValue() === '') {
							// Restore the previously selected value
							this.setValue(select_value);
						}
						// Destroy Selectize on blur - short timeout to avoid Selectize error
						var selectize = this;
						var value = this.getValue();
						setTimeout(function() {
							selectize.destroy();
							// Set select value
							$target.addClass('uk-select').val(value).change();
						}, 100);
					}
				});

				// Open dropdown
				$target[0].selectize.open();
			}
		});

	});

}(jQuery));
