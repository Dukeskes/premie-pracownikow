angular.module(APP_ID).controller('appController', ['$state', 'breadcrumbsBuilder', 'authService', 'toaster', function($state, breadcrumbsBuilder, authService, toaster) {
	var vm = this;

	vm.breadcrumbs = breadcrumbsBuilder.init();
	vm.menuItems = [
		State.getItem(State.Token.DASHBOARD),
        State.getItem(State.Token.USER_EDIT),
		State.getItem(State.Token.ERROR)
	];

	vm.logOut = _logOut;
    vm.helloButtonClick = _helloButtonClick;

    function _helloButtonClick() {
        toaster.pop('info', 'Hello world');
    }

	function _logOut() {
		authService.logOut()
			.then(function() {
				$state.go(State.Token.LOGIN);
			});
	}
}]);