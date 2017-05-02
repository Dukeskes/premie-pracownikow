angular.module(APP_ID).directive('uiSelectInputClass', function() {
	return {
		restrict: 'A',
		require: 'uiSelect',
		link: function(scope, element, attrs) {
			scope.$watch('$select', function(value) {
				//attrs are used instead of isolated scope because uiSelect is using isolated scope.
				value.inputCustomClass = attrs.uiSelectInputClass;
			});
		}
	};
});
