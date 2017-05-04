angular.module(APP_ID).service('workerService', ['http', function (http) {
	this.create = function (worker) {
		return http.post('http://localhost/premie/ws/worker/', worker);
	};

	this.update = function (worker) {
		return http.put('http://localhost/premie/ws/worker/', worker);
	};

	this.fetchEntry = function (workerId) {
		return http.get('http://localhost/premie/ws/worker/' + workerId);
	};

	this.fetchEntries = function (params) {
		return http.post('http://localhost/premie/ws/worker/entries', params);
	};

	this.delete = function (workerId) {
		return http.delete('http://localhost/premie/ws/worker/' + workerId);
	};
}]);