angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	$httpBackend.whenPOST('ws/auth/logIn').respond(function(method, url, data) {


		var json = JSON.parse(data);
		for(var i = 0; i < Database.users.length; ++i) {
			var user = Database.users[i];
			if(user.username == json.username && user.password == json.password) {
				var authToken = user.username + '_token';
				return [ResponseCode.OK, new UserPrincipal(user.id, Role.ADMIN, authToken)];
			}
		}

		return [ResponseCode.UNAUTHORIZED];
	});
	$httpBackend.whenPOST('ws/auth/logOut').respond(function() {
		return [ResponseCode.OK, {}];
	});
}]);