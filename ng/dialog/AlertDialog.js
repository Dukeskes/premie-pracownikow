angular.module(APP_ID).service('alertDialog', ['ngDialog', function(ngDialog) {
	this.show = function(message, type) {
		ngDialog.open({
			template: 'template/util/dialog/alertDialogView.html',
			controller: ['$scope', function($scope) {
				$scope.msg = message;
				switch(type) {
					case AlertType.ERROR:
						$scope.header = "Error";
						break;
					case AlertType.SUCCESS:
						$scope.header = "Success";
						break;
					default:
						$scope.header = "Alert";
				}
				$scope.msg = message;
			}]
		});
	};
}]);