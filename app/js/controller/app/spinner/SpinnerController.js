angular.module(APP_ID).controller('spinnerController', ['spinner', 'breadcrumbsBuilder', 'tableBuilder', 'userService',
	function(spinner, breadcrumbsBuilder, tableBuilder, userService) {
		var SpinnerKey = {
			BUTTON: 'BUTTON',
			SELECT: 'SELECT',
			PRIMARY_SELECT: 'PRIMARY_SELECT',
			SECTION: 'SECTION',
			TABLE: 'TABLE'
		};

		var vm = this;
		vm.SpinnerKey = SpinnerKey;

		vm.fooBars = {
			available: ['foo', 'bar'],
			selected: null
		};
		vm.primaryFooBars = {
			available: ['primFoo', 'primBar'],
			selected: null
		};
		vm.table = tableBuilder.createTable(userService.fetchEntries);

		vm.start = _start;
		vm.stop = _stop;

		(function _init() {
			breadcrumbsBuilder
				.init()
				.addItem(State.Token.SPINNER);

			vm.table.spinnerKey(SpinnerKey.TABLE)
				.createColumn('id', 'Id')
				.createColumn('username', 'Login')
				.createColumn('password', 'Hasło');
		})();

		function _start() {
			spinner.start(SpinnerKey.BUTTON);
			spinner.start(SpinnerKey.SELECT);
			spinner.start(SpinnerKey.PRIMARY_SELECT);
			spinner.start(SpinnerKey.SECTION);
			spinner.start(SpinnerKey.TABLE);
		}
		function _stop() {
			spinner.stop(SpinnerKey.BUTTON);
			spinner.stop(SpinnerKey.SELECT);
			spinner.stop(SpinnerKey.PRIMARY_SELECT);
			spinner.stop(SpinnerKey.SECTION);
			spinner.stop(SpinnerKey.TABLE);
		}
	}]);