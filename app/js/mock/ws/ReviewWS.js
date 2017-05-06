angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {

	$httpBackend.whenPUT('ws/review').respond(function(method, url, data) {
		var json = JSON.parse(data);
		for (var i = 0; i < Database.reviews.length; ++i) {
			if (Database.reviews[i].worker.token === json.worker.token) {
				Database.reviews[i].efficiency = json.efficiency;
				Database.reviews[i].punctuality = json.punctuality;
				Database.reviews[i].userRate = json.userRate;
				return [ResponseCode.OK, 'SUCCESS.SAVE'];
			}
		}
		return [ResponseCode.NOT_FOUND, 'ERROR.NOT_FOUND'];
	});
}]);