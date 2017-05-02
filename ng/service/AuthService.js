angular.module(APP_ID).service('authService', ['$http', 'http', '$cookies', function($http, http, $cookies) {
	var _STATE_ROLES_MAP = {};
	_STATE_ROLES_MAP[State.Token.LOGIN] = [Role.ANONYMOUS];
	_STATE_ROLES_MAP[State.Token.REGISTRATION] = [Role.ANONYMOUS];
	_STATE_ROLES_MAP[State.Token.APP] = [Role.ADMIN];
    _STATE_ROLES_MAP[State.Token.DASHBOARD] = [Role.ADMIN];
    _STATE_ROLES_MAP[State.Token.USER_EDIT] = [Role.ADMIN];
	_STATE_ROLES_MAP[State.Token.ERROR] = [Role.ADMIN];

	this.logIn = function(username, password) {

		return http.post('ws/auth/logIn', new Credentials(username, password)).resolve(function(response) {
			var userPrincipal = response.data;
			$http.defaults.headers.common[CookieToken.AUTH] = userPrincipal.token;
			$cookies.put(CookieToken.AUTH, userPrincipal.token);
			$cookies.put(CookieToken.ROLE, userPrincipal.role.toString());

			return userPrincipal;
		});
	};

	this.logOut = function() {
		return http.post('ws/auth/logOut', {}).resolve(function(response) {
			$cookies.remove(CookieToken.AUTH);
			$cookies.remove(CookieToken.ROLE);

			return response.data;
		});
	};

	this.getToken = function() {
		return $cookies.get(CookieToken.AUTH);
	};
	this.getRole = function() {
		return Optional.get($cookies.get(CookieToken.ROLE), Role.ANONYMOUS);
	};

	this.isAuthenticated = function() {
		return Optional.isDefined(this.getToken());
	};
	this.isStateAllowed = function (stateToken) {
		var role = this.getRole();
		return (_STATE_ROLES_MAP[stateToken].indexOf(role) !== -1);
	};
}]);
