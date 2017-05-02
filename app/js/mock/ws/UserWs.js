angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	var _entries = Database.users;

	$httpBackend.whenPOST('ws/user/entries').respond(function(method, url, data) {
		var json = JSON.parse(data);
		return [200, DataUtil.fetchTableData(_entries, json.offset, json.limit)];
	});
	$httpBackend.whenPOST('ws/user').respond(function(method, url, data) {
		var json = JSON.parse(data);

		for(var i = 0; i < Database.users.length; ++i) {
			if(json.username === Database.users[i].username) {
				return [ResponseCode.INTERNAL_ERROR, 'ERROR.USERNAME_ALREADY_EXISTS'];
			}
		}
		Database.users.push(json);
		json.id = Database.users.length;
		return [ResponseCode.OK, {id: json.id}];
	});
}]);