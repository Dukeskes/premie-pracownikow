angular.module(APP_ID).service('workerService', ['http', function(http) {
    this.create = function(worker) {
        return http.post('ws/worker/', worker);
    };

    this.update = function(worker) {
        return http.put('ws/worker/', worker);
    };

    this.fetchEntry = function(workerId) {
        return http.get('ws/worker/' + workerId);
    };

    this.fetchEntries = function(params) {
        return http.post('ws/worker/entries', params);
    };

    this.delete = function(workerId) {
        return http.delete('ws/worker/' + workerId);
    };
}]);