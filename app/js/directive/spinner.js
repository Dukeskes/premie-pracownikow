angular.module(APP_ID).directive('spinner', ['spinner', function(spinner) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var elementNode = element[0];
			var spinnerElement = _appendSpinnerElement(element, elementNode.tagName, elementNode.className);

			(function _init() {
				spinnerElement.hide();

				spinner.observe(attrs.spinner, function(value) {
					if(value) {
						elementNode.disabled = true;
						spinnerElement.show();
					} else {
						elementNode.disabled = false;
						spinnerElement.hide();
					}
				});
			})();

			function _appendSpinnerElement(element, tagName, className) {
				switch(tagName) {
					case 'BUTTON':
						element.append(_getButtonSpinner());
						break;
					case 'DIV':
						if(className.indexOf('ui-select') !== -1) {
							element.append(_getButtonSpinner());
						} else {
							element.append(_getDefaultSpinner());
						}
						break;
					default:
						element.append(_getDefaultSpinner());
						break;
				}

				return element.children().last();
			}
			function _getButtonSpinner() {
				return '<i class="spinner fa fa-spinner fa-spin"></i>';
			}
			function _getDefaultSpinner() {
				return '' +
					'<aside class="loading">' +
						'<div class="loading-holder">' +
							'<span class="dot dot_1"></span>' +
							'<span class="dot dot_2"></span>' +
							'<span class="dot dot_3"></span>' +
							'<span class="dot dot_4"></span>' +
						'</div>' +
					'</aside>';
			}
		}
	};
}]);
