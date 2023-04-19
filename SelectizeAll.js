(function($) {

	$(document).ready(function() {

		// When element focused
		$(document).on('focusin', function(event) {

			// If target is a valid select
			var $target = $(event.target);
			if($target.is('.sa-selectize select:not([multiple])')) {

				// Init Selectize
				var is_asm = $target.closest('.InputfieldAsmSelect').length;
				var select_height = $target.outerHeight();
				var select_width = $target.outerWidth();
				var select_value;
				var empty_options = [];
				$target.removeClass('uk-select uk-form-small').selectize({
					allowEmptyOption: true,
					plugins: {
						'custom_change': {}
					},
					onInitialize: function() {
						// Add disabled status to data
						var selectize = this;
						selectize.revertSettings.$children.each(function () {
							// Keep track of options without a value attribute
							// For some reason this.value returns the option text if no value attribute present
							// So selectize.getValue() gives the wrong result in this case
							if(!this.hasAttribute('value')) empty_options.push(this.value);
							$.extend(selectize.options[this.value], {disabled: Boolean($(this).attr('disabled'))});
						});
						// Set height and width to match replaced select
						this.$control.css({
							'height': select_height + 'px',
							'width': select_width + 'px',
						});
						// Reset label "for" attribute back to default because Selectize fails to do this on destroy
						var selectized_id = this.$control_input.attr('id');
						var original_id = this.$input.attr('id');
						$('label[for="' + selectized_id + '"]').attr('for', original_id);
					},
					onType: function(str) {
						// Fix highlight bug: https://github.com/selectize/selectize.js/issues/1141
						str || this.$dropdown_content.removeHighlight();
					},
					onDropdownOpen: function() {
						// Get the existing selected value
						select_value = this.getValue();
						// Clear select_value if it corresponds to an empty option
						if(empty_options.indexOf(select_value) !== -1) select_value = '';
						// If no existing value, clear so that typing will filter
						if(!select_value) this.clear(false);
					},
					onBlur: function() {
						// Check if this select has an empty option
						empty_option = false;
						var option_values = Object.keys(this.options);
						if(option_values.indexOf('') !== -1) empty_option = true;
						var value = this.getValue();
						// Clear value if it corresponds to an empty option
						if(empty_options.indexOf(value) !== -1) value = '';
						// Trying to set an empty value to a select that doesn't have an empty option
						if(!empty_option && !value) {
							// Restore the previously selected value
							this.setValue(select_value);
						}
						// Destroy Selectize on blur - short timeout to avoid Selectize error
						var selectize = this;
						setTimeout(function() {
							selectize.destroy();
							// Set select value
							var pw_class = is_asm ? 'uk-select uk-form-small' : 'uk-select';
							$target.addClass(pw_class);
							$target.val(value);
							// Only trigger change on AsmSelect if value was not empty
							if(!is_asm || value) $target.trigger('change');
						}, 50);
					},
					render: {
						// Override option render method to support disabled options
						option: function(data, escape) {
							if(data.disabled) {
								return '<div class="option disabled">' + escape(data.text) + '</div>';
							} else {
								return '<div class="option">' + escape(data.text) + '</div>';
							}
						}
					}
				});

				// Open dropdown
				$target[0].selectize.open();
			}
		});

	});

}(jQuery));
