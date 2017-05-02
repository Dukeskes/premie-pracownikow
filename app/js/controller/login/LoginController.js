angular.module(APP_ID).controller('loginController', ['$state', 'spinner', 'authService', function($state, spinner, authService) {
	var vm = this;
	vm.credentials = new Credentials();
	vm.errorToken = null;

	vm.hasError = _hasError;
	vm.logIn = _logIn;

	function _hasError() {
		return Optional.isDefined(vm.errorToken);
	}

	function _logIn() {
		vm.errorToken = null;

		spinner.start();
		authService.logIn(vm.credentials)
			.then(function() {
				$state.go(State.Token.APP);
				spinner.stop();
			}, function(data) {
				vm.errorToken = data;
				spinner.stop();
			});
	}
}]);