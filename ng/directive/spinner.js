angular.module(APP_ID).directive('spinner', ['spinner', function(spinner) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			spinner.observe(attrs.spinner, function(value) {
				if(value) {
					element.addClass('spinner');
					element.attr('disabled', 'disabled');
				} else {
					element.removeClass('spinner');
					element.attr('disabled', null);
				}
			});
		}
	};
}]);
