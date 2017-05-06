angular.module(APP_ID).service('authService', ['$http', 'http', '$cookies', function($http, http, $cookies) {
	var _STATE_ROLES_MAP = {};
	_STATE_ROLES_MAP[State.Token.LOGIN] = [Role.ANONYMOUS];
	_STATE_ROLES_MAP[State.Token.REGISTRATION] = [Role.ANONYMOUS];
	_STATE_ROLES_MAP[State.Token.APP] = [Role.ADMIN, Role.USER, Role.PM];
	_STATE_ROLES_MAP[State.Token.DASHBOARD] = [Role.ADMIN, Role.USER, Role.PM];
	_STATE_ROLES_MAP[State.Token.DIALOG] = [Role.ADMIN];
	_STATE_ROLES_MAP[State.Token.SPINNER] = [Role.ADMIN];
	_STATE_ROLES_MAP[State.Token.WORKERS] = [Role.ADMIN, Role.USER, Role.PM];
	_STATE_ROLES_MAP[State.Token.QUESTIONNAIRE] = [Role.ADMIN, Role.USER, Role.PM];
	_STATE_ROLES_MAP[State.Token.WORKER] = [Role.ADMIN];
	_STATE_ROLES_MAP[State.Token.ERROR] = [Role.ADMIN];

	this.logIn = function(credentials) {
		return http.post('ws/auth/logIn', credentials)
			.resolve(function(response) {
				var userPrincipal = response.data;

				$http.defaults.headers.common[CookieToken.AUTH] = userPrincipal.token;
				$cookies.put(CookieToken.ID,   userPrincipal.id);
				$cookies.put(CookieToken.AUTH, userPrincipal.token);
				$cookies.put(CookieToken.ROLE, userPrincipal.role);
				$cookies.put(CookieToken.USER, userPrincipal.name);

				return userPrincipal;
			});
	};

	this.logOut = function() {
		return http.post('ws/auth/logOut', {})
			.resolve(function(response) {
				$cookies.remove(CookieToken.ID);
				$cookies.remove(CookieToken.AUTH);
				$cookies.remove(CookieToken.ROLE);
				$cookies.remove(CookieToken.USER);

				return response.data;
			});
	};

	this.getToken = function() {
		return $cookies.get(CookieToken.AUTH);
	};
	this.getRole = function() {
		return Optional.get($cookies.get(CookieToken.ROLE), Role.ANONYMOUS);
	};
	this.getUserName = function() {
		return $cookies.get(CookieToken.USER);
	};
	this.getUserID = function() {
		return $cookies.get(CookieToken.ID);
	};

	this.isAuthenticated = function() {
		return Optional.isDefined(this.getToken());
	};
	this.isStateAllowed = function (stateToken) {
		var role = this.getRole();
		return (_STATE_ROLES_MAP[stateToken].indexOf(role) !== -1);
	};
}]);
