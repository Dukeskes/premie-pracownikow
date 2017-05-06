angular.module(APP_ID).service('reviewService', ['http', '$q', function (http, $q) {

	this.update = function (review) {
		return http.put('ws/review', review);
	};

}]);