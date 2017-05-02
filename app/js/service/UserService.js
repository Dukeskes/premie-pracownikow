angular.module(APP_ID).service('userService', ['http', function(http) {
	this.create = function(user) {
		return http.post('ws/user', user);
	};

	this.fetchEntries = function(params) {
		return http.post('ws/user/entries', params);
	};
}]);
