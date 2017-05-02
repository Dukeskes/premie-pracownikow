angular.module(APP_ID).service('alertDialog', ['$uibModal', function($uibModal) {
	this.info = function(message) {
		return _open('Success', message);
	};

	this.error = function(message) {
		return _open('Error', message);
	};

	function _open(header, message) {
		var _dialog = $uibModal.open({
			templateUrl: 'template/util/dialog/alertDialogView.html',
			controller: function() {
				var vm = this;

				vm.header = header;
				vm.msg = message;

				vm.close = _close;

				function _close() {
					_dialog.close();
				}
			}
		});

		return _dialog;
	}
}]);