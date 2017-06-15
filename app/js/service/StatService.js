angular.module(APP_ID).service('statService', ['http', '$q', function(http, $q) {

    this.fetch = function() {
        return http.get('ws/stats/dashboard');
    };

}]);