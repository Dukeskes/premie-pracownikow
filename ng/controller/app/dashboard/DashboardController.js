angular.module(APP_ID).controller('dashboardController', ['spinner', 'breadcrumbsBuilder', 'toaster', function(spinner, breadcrumbsBuilder, toaster) {
	var vm = this;

	breadcrumbsBuilder
		.init()
		.addItem(State.Token.APP)
		.addItem(State.Token.DASHBOARD);

	vm.dummy = 'Hi! This world is brutal, and full of zasadzkas and sometimes kopas w dupas';

	vm.lazyHello = _lazyHello;

	function _lazyHello() {
		spinner.start();
		setTimeout(function() {
			spinner.stop();
		}, 2000);
	}
}]);