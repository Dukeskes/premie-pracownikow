angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	$httpBackend.whenPOST('ws/auth/logIn').respond(function(method, url, data) {
		var json = JSON.parse(data);
		for(var i = 0; i < Database.users.length; ++i) {
			var user = Database.users[i];
			if(user.username == json.login && user.password == json.password) {
				var authToken = user.username + '_token';
				return [ResponseCode.OK, new UserPrincipal(user.id, Role.ADMIN, authToken, user.username)];
			}
		}

		return [ResponseCode.UNAUTHORIZED, 'ERROR.WRONG_CREDENTIALS'];
	});
	$httpBackend.whenPOST('ws/auth/logOut').respond(function() {
		return [ResponseCode.OK, {}];
	});
}]);