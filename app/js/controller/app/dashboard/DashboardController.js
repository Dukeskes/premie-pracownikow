angular.module(APP_ID).controller('dashboardController', ['spinner', 'breadcrumbsBuilder', 'alert', function(spinner, breadcrumbsBuilder, alert) {
	var vm = this;
	vm.dummy = 'Hello world!';

	(function _init() {
		breadcrumbsBuilder
			.init()
			.addItem(State.Token.DASHBOARD);
	})();
}]);