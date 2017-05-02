angular.module(APP_ID).controller('loginController', ['$state', 'authService', 'spinner', function($state, authService, spinner) {
    var vm = this;
    var SpinnerKey = {
        LOGIN_BUTTON: 'LOGIN_BUTTON'
    };

    vm.spinnerKey = SpinnerKey;
    vm.username = null;
    vm.password = null;
    vm.error = null;

    vm.hasError = function() {
        return Optional.isDefined(vm.error);
    };


    vm.logIn = function() {
        vm.error = null;
        spinner.start(vm.spinnerKey.LOGIN_BUTTON);

        if(vm.username && vm.password) {
            authService.logIn(vm.username, vm.password)
                .then(function() {
                    $state.go(State.Token.APP);
                    spinner.stop(vm.spinnerKey.LOGIN_BUTTON);
                }, function() {
                    vm.error = 'Nieprawidłowe dane';
                    spinner.stop(vm.spinnerKey.LOGIN_BUTTON);
                });
        }
    };
}]);