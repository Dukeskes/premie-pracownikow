angular.module(APP_ID).controller('errorController', ['breadcrumbsBuilder', function(breadcrumbsBuilder) {
	var vm = this;

	breadcrumbsBuilder
		.init()
		.addItem(State.Token.ERROR);

	vm.message = '404 not found :)';
}]);