angular.module(APP_ID).service('reviewService', ['http', '$q', function(http, $q) {

    this.update = function(review) {
        return http.put('ws/review', review);
    };

    this.fetchEntry = function(reviewToken, workerId) {
        var params = {
            reviewToken: reviewToken
        };

        return http.get('ws/worker/' + workerId + '/review', {
            params: params
        });
    };

}]);