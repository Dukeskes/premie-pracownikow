angular.module(APP_ID).controller('dashboardController', ['spinner', '$state', '$window', 'tableBuilder', 'breadcrumbsBuilder', 'alert', 'workerService', 'statService',
	function(spinner, $state, $window, tableBuilder, breadcrumbsBuilder, alert, workerService, statService) {
		var vm = this;
		var SpinnerKey = {
			TABLE: 'TABLE_TABLE',
			STATS: 'STATS'
		};

		vm.stats = null;

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
				.createColumn('bonusRate', 'Premia w %')
				.limit(5)
				.page(1);

			spinner.start(SpinnerKey.STATS);
			statService.fetch().then(function(stats){
				vm.stats = stats;
				spinner.stop(SpinnerKey.STATS);
			});
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