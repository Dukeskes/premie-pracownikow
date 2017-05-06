angular.module(APP_ID).controller('appController', ['$state', 'spinner', 'breadcrumbsBuilder', 'authService', function($state, spinner, breadcrumbsBuilder, authService) {
	var SpinnerKey = {
		LOGOUT_BUTTON: 'APP_LOGOUT_BUTTON'
	};

	var vm = this;
	vm.SpinnerKey = SpinnerKey;

	vm.breadcrumbs = breadcrumbsBuilder.init();
	vm.menu = {
		activeIndex: null,
		mouseoverIndex: -1,
		items: [
			State.getItem(State.Token.DASHBOARD),
			State.getItem(State.Token.WORKERS)
		]
	};

	vm.getMenuItemClass = _getMenuItemClass;
	vm.getLoggedUser = _getLoggedUser;
	vm.logOut = _logOut;

	(function _init() {
		for(var i = 0; i < vm.menu.items.length; ++i) {
			if(vm.menu.items[i].getToken() === $state.current.name) {
				vm.menu.activeIndex = i;
				break;
			}
		}
	})();

	function _getMenuItemClass(index) {
		var currentIndex = (vm.menu.mouseoverIndex >= 0) ? vm.menu.mouseoverIndex : vm.menu.activeIndex;
		var number = (currentIndex >= index ) ? (currentIndex - index + 1) : (index - currentIndex + 1);
		return 'broth-' + number;
	}

	function _getLoggedUser() {
		return authService.getUserName();
	}

	function _logOut() {
		spinner.start(SpinnerKey.LOGOUT_BUTTON);
		authService.logOut()
			.then(function() {
				$state.go(State.Token.LOGIN);
				spinner.stop(SpinnerKey.LOGOUT_BUTTON);
			}, function() {
				spinner.start(SpinnerKey.LOGOUT_BUTTON);
			});
	}
}]);