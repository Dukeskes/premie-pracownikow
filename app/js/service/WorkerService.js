angular.module(APP_ID).service('workerService', ['http', '$q', function(http, $q) {

    this.create = function(worker) {
        return http.post('ws/worker', worker);
    };

    this.fetchEntries = function(params) {
        return http.post('ws/worker/entries', params);
    };

    this.fetchBest = function(params) {
        return http.post('ws/worker/best', params);
    };

    this.fetchEntry = function(workerId) {
        return http.get('ws/worker/' + workerId);
    };

    this.getWorkerToken = function(workerId) {
        return http.get('ws/worker/' + workerId + '/token', {
            transformResponse: function(data) {
                return data;
            }
        });
    };

    this.getByToken = function(token) {
        return http.get('ws/worker/byToken/' + token);
    };

    this.getReview = function(reviewToken, reviewerId) {
        var params = {
            reviewToken: reviewToken
        };

        console.log(http.get('ws/worker/' + reviewerId + '/review', {
            params: params
        }));

        return http.get('ws/worker/' + reviewerId + '/review', {
            params: params
        });
    };

    this.update = function(worker) {
        return http.put('ws/worker', worker);
    };

    this.delete = function(workerId) {
        return http.delete('ws/worker/' + workerId);
    };

}]);