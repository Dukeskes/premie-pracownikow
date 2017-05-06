angular.module(APP_ID).service('reviewService', ['http', '$q', function (http, $q) {

	this.update = function (worker) {
		return http.put('ws/review', worker);
	};

}]);