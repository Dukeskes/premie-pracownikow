angular.module(APP_ID).controller('dialogController', ['spinner', 'breadcrumbsBuilder', 'alert', 'alertDialog', 'confirmDialog',
	function(spinner, breadcrumbsBuilder, alert, alertDialog, confirmDialog) {
		var vm = this;

		vm.showAlertDialog = _showAlertDialog;
		vm.showConfirmDialog = _showConfirmDialog;
		vm.showToast = _showToast;

		(function _init() {
			breadcrumbsBuilder
				.init()
				.addItem(State.Token.DIALOG);
		})();

		function _showAlertDialog() {
			alertDialog.info('Hello world');
		}
		function _showConfirmDialog() {
			confirmDialog.open(
				'Are you siur?',
				function() {
					alert.success('Confirmed');
				}, function() {
					alert.error('Canceled');
				}
			);
		}
		function _showToast() {
			alert.info('Hello info');
			alert.success('Hello success');
			alert.error('Hello error');
		}
	}]);