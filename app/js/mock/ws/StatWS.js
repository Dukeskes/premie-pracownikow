angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {

	$httpBackend.whenGET('ws/stats/dashboard').respond(function(method, url, data) {
		return [ResponseCode.OK, Database.stats];
	});
}]);