angular.module(APP_ID).directive('unsupportedResolution', ['$window', function($window) {
	var _DEFAULT_MIN_WIDTH = 1024;
	var _VIEW_TEMPLATE = {
		UNSUPPORTED_DEVICE: 'template/util/resolution/unsupportedDevice.html',
		ROTATE_DEVICE: 'template/util/resolution/rotateDevice.html',
		NONE: null
	};

	return {
		restrict: 'E',
		templateUrl: 'template/util/resolution/unsupportedResolution.html',
		replace: true,
		scope: {
			minWidth: '=?'
		},
		link: function(scope, element, attrs) {
			scope.$minWidth = (Optional.isDefined(scope.minWidth)) ? parseInt(scope.minWidth) : _DEFAULT_MIN_WIDTH;
			scope.$viewTemplate = null;

			(function _init() {
				setTimeout(_checkResolution, 0);
				angular.element($window).bind('resize', _checkResolution);
			})();

			function _checkResolution() {
				scope.$apply(function() {
					scope.$viewTemplate = _resolveViewTemplate();
				});
			}

			var _resolveViewTemplate = function() {
				if($window.innerWidth < scope.$minWidth) {
					if($window.screen.height >= scope.$minWidth) {
						return _VIEW_TEMPLATE.ROTATE_DEVICE;
					} else {
						return _VIEW_TEMPLATE.UNSUPPORTED_DEVICE;
					}
				} else {
					return _VIEW_TEMPLATE.NONE;
				}
			};
		}
	};
}]);