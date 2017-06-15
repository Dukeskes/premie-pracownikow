angular.module(APP_ID).controller('workersController', ['tableBuilder', 'spinner', '$state', '$window', 'authService', 'workerService', 'workerDialog',
	function (tableBuilder, spinner, $state, $window, authService, workerService, workerDialog) {
		var SpinnerKey = {
			TABLE: 'TABLE_TABLE'
		};

		var vm = this;
		vm.SpinnerKey = SpinnerKey;
		vm.table = tableBuilder.createTable(workerService.fetchEntries);

		vm.toggleOrder = _toggleOrder;
		vm.addWorker = _addWorker;
		vm.editWorker = _editWorker;
		vm.removeWorker = _removeWorker;
		vm.toggleOrder = _toggleOrder;
		vm.loadData = _loadData;
		vm.showQuestionnaire = _showQuestionnaire;
		vm.showWorker = _showWorker;
		vm.isAddUserAvailable = _isAddUserAvailable;

		(function _init() {
			_loadData();
		})();

		function _loadData() {
			vm.table = tableBuilder.createTable(workerService.fetchEntries);
			vm.table.spinnerKey(SpinnerKey.TABLE)
				.createColumn('id', 'Identyfikator')
				.createColumn('name', 'Imię')
				.createColumn('surname', 'Nazwisko')
				.createColumn('birthDate', 'Data urodzenia')
				.createColumn('experienceMonths', 'Staż (miesiące)');
		}

		function _toggleOrder(key) {
			vm.table.toggleOrder(key)
				.reload();
		}

		function _addWorker() {
			workerDialog.show(_loadData);
		}

		function _editWorker(_loadData, workerId) {
			workerDialog.show(_loadData, workerId);
		}

		function _removeWorker(workerId) {
			spinner.start(SpinnerKey.TABLE);
			workerService.delete(workerId).then(function () {
				_loadData();
				spinner.stop(SpinnerKey.TABLE);
			});
		}

		function _isAddUserAvailable() {
			if(_getLoggedUserRole() != Role.USER) {
				console.log('tak');
				return true;
			}
			console.log('nie');
			return false;
		}

		function _getLoggedUserRole() {
			return authService.getRole();
		}

		function _showQuestionnaire(workerId) {
			workerService.getWorkerToken(workerId).then(function (data) {
				var _url = $state.href(State.Token.QUESTIONNAIRE, {
					token: data
				});
				$window.open(_url, '_blank');
			});
		}

		function _showWorker(workerId) {
			workerService.getWorkerToken(workerId).then(function (data) {
				var _url = $state.href(State.Token.WORKER, {
					token: data
				});
				$window.open(_url, '_self');
			});
		}
	}
]);