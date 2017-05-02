angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	$httpBackend.whenGET(/^template\//).passThrough();
	$httpBackend.whenGET(/^language\//).passThrough();
}]);