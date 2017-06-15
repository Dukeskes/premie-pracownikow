angular.module(APP_ID).service('statService', ['http', '$q', function(http, $q) {

    this.fetch = function() {
        console.log(http.get('ws/stats/dashboard'));
        return http.get('ws/stats/dashboard');
    };

}]);