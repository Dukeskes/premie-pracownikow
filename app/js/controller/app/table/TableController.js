angular.module(APP_ID).controller('tableController', ['breadcrumbsBuilder', 'tableBuilder', 'userService',
	function(breadcrumbsBuilder, tableBuilder, userService) {
		var SpinnerKey = {
			TABLE: 'TABLE_TABLE'
		};

		var vm = this;
		vm.SpinnerKey = SpinnerKey;

		vm.table = tableBuilder.createTable(userService.fetchEntries);

		vm.toggleOrder = _toggleOrder;

		(function _init() {
			breadcrumbsBuilder.init()
				.addItem(State.Token.TABLE);

			vm.table.spinnerKey(SpinnerKey.TABLE)
				.createColumn('id', 'Identyfikator')
				.createColumn('username', 'Login')
				.createColumn('password', 'Hasło');
		})();

		function _toggleOrder(key) {
			vm.table.toggleOrder(key)
				.reload();
		}
	}]);