angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	$httpBackend.whenGET(/^template\//).passThrough();
	$httpBackend.whenGET(/^i18n\//).passThrough();
	$httpBackend.whenGET(/^fonts\//).passThrough();
	$httpBackend.whenGET(/^img\//).passThrough();
}]);