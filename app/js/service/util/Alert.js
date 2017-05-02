angular.module(APP_ID).service('alert', ['toaster', function(toaster) {
	this.info = function(message) {
		return _show('info', message);
	};
	this.success = function(message) {
		return _show('success', message);
	};
	this.error = function(message) {
		return _show('error', message);
	};

	function _show(type, msg) {
		toaster.pop(type, '', msg);
	}
}]);