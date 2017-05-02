angular.module(APP_ID).service('confirmDialog', ['$uibModal', function($uibModal) {
	this.open = function(message, onConfirm, onCancel) {
		var _dialog = $uibModal.open({
			templateUrl: 'template/util/dialog/confirmDialogView.html',
			controller: ['$scope', function($scope) {
				var vm = this;

				vm.msg = message;

				vm.confirm = _confirm;
				vm.cancel = _cancel;

				(function _init() {
					$scope.$on('modal.closing', function($event, data) {
						//call to prevent closing
						//$event.preventDefault();
						Optional.call((data === true) ? onConfirm : onCancel);
					});
				})();

				function _confirm() {
					_dialog.close(true);
				}
				function _cancel() {
					_dialog.close(false);
				}
			}]
		});

		return _dialog;
	};
}]);