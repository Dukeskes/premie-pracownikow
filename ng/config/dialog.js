angular.module(APP_ID).config(['ngDialogProvider', function(ngDialogProvider) {
	ngDialogProvider.setDefaults({
		plain: false,
		showClose: true,
		closeByDocument: true,
		closeByEscape: true
	});
}]);
