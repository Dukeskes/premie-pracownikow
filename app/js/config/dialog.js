angular.module(APP_ID).config(['$uibModalProvider', function($uibModalProvider) {
	$uibModalProvider.options.backdrop = 'static';
	$uibModalProvider.options.backdropClass = 'dialog-backdrop';
	$uibModalProvider.options.windowClass = 'dialog';
	$uibModalProvider.options.controllerAs = 'vm';
}]);
