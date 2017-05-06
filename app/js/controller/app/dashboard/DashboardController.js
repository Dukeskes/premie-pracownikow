angular.module(APP_ID).controller('dashboardController', ['spinner', '$state', '$window', 'tableBuilder', 'breadcrumbsBuilder', 'alert', 'workerService',
	function(spinner, $state, $window, tableBuilder, breadcrumbsBuilder, alert, workerService) {
		var vm = this;
		var SpinnerKey = {
			TABLE: 'TABLE_TABLE'
		};

		vm.toggleOrder = _toggleOrder;
		vm.showWorker = _showWorker;

		(function _init() {
			_loadData();
		})();

		function _loadData() {
			vm.table = tableBuilder.createTable(workerService.fetchBest);
			vm.table.spinnerKey(SpinnerKey.TABLE)
				.createColumn('id', 'Identyfikator')
				.createColumn('name', 'Imię')
				.createColumn('surname', 'Nazwisko')
				.createColumn('bonusRate', 'Premia w %');
		}

		function _toggleOrder(key) {
			vm.table.toggleOrder(key)
				.reload();
		}

		function _showWorker(workerId) {
			workerService.getWorkerToken(workerId).then(function(data) {
				var _url = $state.href(State.Token.WORKER, {
					token: data
				});
				$window.open(_url, '_self');
			});
		}
}]);