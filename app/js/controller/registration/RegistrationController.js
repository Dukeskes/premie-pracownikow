angular.module(APP_ID).controller('registrationController', ['$state', 'spinner', 'userService',
	function($state, spinner, userService) {
		var vm = this;
		vm.item = new User();

		vm.signUp = _signUp;

		function _signUp() {
			spinner.start();
			userService.create(vm.item)
				.then(function() {
					$state.go(State.Token.LOGIN);
					spinner.stop();
				}, function() {
					spinner.stop();
				});
		}
	}]);