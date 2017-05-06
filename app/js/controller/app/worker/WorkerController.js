angular.module(APP_ID).controller('workerController', ['$stateParams', '$state', 'alert', '$q', 'spinner', 'workerService', 'authService', 'reviewService',
	function ($stateParams,$state, alert, $q, spinner, workerService, authService, reviewService) {
		var SpinnerKey = {
			VIEW: 'VIEW'
		};

		var vm = this;
		vm.SpinnerKey = SpinnerKey;
		vm.worker = null;
		vm.workersTable = State.getItem(State.Token.WORKERS);

		vm.getLoggedUserRole = _getLoggedUserRole;
		vm.save = _save;

		(function _init() {
			_loadData();
		})();

		function _loadData() {
			spinner.start(SpinnerKey.QUESTIONNAIRE);
			workerService.getByToken($stateParams.token)
				.then(function(worker) {
					vm.worker = worker;
					console.log(worker);
					spinner.stop(SpinnerKey.QUESTIONNAIRE);
				});
		}

		function _getLoggedUserRole() {
			return authService.getRole();
		}

		function _getLoggedUserId() {
			return authService.getUserID();
		}
		
		function _save() {
			spinner.start(vm.SpinnerKey.SAVE_BUTTON);
			reviewService.update(vm.review).then(_onSuccess, _onError);
		}

		function _onSuccess() {
			alert.success("Pomyślnie zrecenzowano pracownika");
			spinner.stop(vm.SpinnerKey.SAVE_BUTTON);
			$state.go(State.Token.WORKERS);
		}

		function _onError(errorCode) {
			alert.error("Błąd przy zapiszu");
			spinner.stop(vm.SpinnerKey.SAVE_BUTTON);
		}

	}
]);