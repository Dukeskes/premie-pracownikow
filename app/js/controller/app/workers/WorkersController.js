angular.module(APP_ID).controller('workersController', ['tableBuilder', 'spinner', 'workerService', 'workerDialog',
	function (tableBuilder, spinner, workerService, workerDialog) {
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
			vm.table.toggleOrder(key);
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
	}
]);