angular.module(APP_ID).service('httpAuthInterceptor', ['$q', '$injector', function($q, $injector) {
	this.request = function(config) {
		return config;
	};
	this.response = function(response) {
		return response;
	};
	this.responseError = function(rejection) {
		if(rejection.status === ResponseCode.UNAUTHORIZED) {
			var $state = $injector.get('$state');
			var authService = $injector.get('authService');

			if(authService.isAuthenticated()) {
				authService.logOut().then(function() {
					$state.go(State.Token.LOGIN);
				});
			} else {
				$state.go(State.Token.LOGIN);
			}
		}
		return $q.reject(rejection);
	};
}]).config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpAuthInterceptor');
}]).run(['$http', 'authService', function($http, authService) {
	$http.defaults.headers.common['Content-Type'] = 'application/json';
	$http.defaults.headers.common[CookieToken.AUTH] = authService.getToken();
}]);