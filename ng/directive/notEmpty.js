/**
 * Use for ui.select
 */
angular.module(APP_ID).directive('notEmpty', function() {
	return {
		require: 'ngModel',
		link: function($scope, el, attrs, ctrl) {
			ctrl.$validators.required = function(modelValue) {
				return modelValue && (modelValue.length === undefined || modelValue.length > 0);
			};
		}
	};
});
