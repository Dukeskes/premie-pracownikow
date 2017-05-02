angular.module(APP_ID).config(['$stateProvider', function($stateProvider) {
	for(var key in State.Token) {
		var item = State.getItem(State.Token[key]);
		var config = {
			templateUrl: item.getTemplate(),
			controller: item.getController(),
			controllerAs: item.getControllerAs(),
			url: (item.isAbstract()) ? null : item.getUrl()
		};

		$stateProvider.state(item.getToken(), config);
	}
}]).run(['$rootScope', '$state', '$window', '$location', 'authService', function($rootScope, $state, $window, $location, authService) {
	$rootScope.$on("$stateChangeStart", function(event, toState) {
		var validUri = Uri.validate($window.location.href);
		if(validUri !== $window.location.href) {
			event.preventDefault();
			$window.location.href = validUri;
		} else {
			if(!authService.isStateAllowed(toState.name)) {
				_redirect((authService.isAuthenticated()) ? State.Token.ERROR : State.Token.LOGIN);
			} else {
				switch(toState.name) {
					case State.Token.APP:
						_redirect(State.Token.DASHBOARD);
						break;
					case State.Token.ERROR :
						if($location.url() === "") {
							_redirect(State.Token.DASHBOARD);
						}
						break;
				}
			}
		}

		function _redirect(token, params) {
			event.preventDefault();
			$state.go(token, params);
		}
	});
}]);
