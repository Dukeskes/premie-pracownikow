angular.module(APP_ID).controller('registrationController', ['$state', 'userService', function($state, userService) {
	var vm = this;

	vm.user = new User();
	vm.error = null;

	vm.signUp = function() {
		vm.error = null;

		if(vm.user.username && vm.user.password) {
			userService.create(vm.user)
				.then(function() {
					$state.go(State.Token.LOGIN);
				}, function() {
					vm.error = 'Blad przy tworzenia';
				});
		}
	};
}]);