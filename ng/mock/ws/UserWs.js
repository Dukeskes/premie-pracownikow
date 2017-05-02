angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	$httpBackend.whenPOST('ws/user').respond(function(method, url, data) {
		var json = JSON.parse(data);
		Database.users.push(json);
		json.id = Database.users.length;
		return [ResponseCode.OK, {id: json.id}];
	});
}]);