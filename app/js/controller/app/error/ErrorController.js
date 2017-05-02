angular.module(APP_ID).controller('errorController', ['breadcrumbsBuilder', function(breadcrumbsBuilder) {
	var vm = this;
	vm.message = '404 not found :)';

	(function _init() {
		breadcrumbsBuilder
			.init()
			.addItem(State.Token.ERROR);
	})();
}]);