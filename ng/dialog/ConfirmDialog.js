angular.module(APP_ID).service('confirmDialog', ['ngDialog', function(ngDialog) {
	this.show = function(message, onConfirm, onCancel) {
		ngDialog.open({
			template: 'template/util/dialog/confirmDialogView.html',
			controller: ['$scope', function($scope) {
				$scope.msg = message;

				$scope.confirm = function() {
					onConfirm();
					$scope.closeThisDialog(1);
				};
			}],
			preCloseCallback: function(value) {
				if(!value && Optional.isDefined(onCancel)) {
					onCancel();
				}
				return true;
			}
		});
	};
}]);