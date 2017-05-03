angular.module(APP_ID).run(['$httpBackend', function($httpBackend) {
	var _entries = Database.workers;

	$httpBackend.whenPOST('ws/worker/entries').respond(function(method, url, data) {
		var json = JSON.parse(data);
		return [200, DataUtil.fetchTableData(_entries, json.offset, json.limit)];
	});

	$httpBackend.whenPOST('ws/worker').respond(function(method, url, data) {
		var json = JSON.parse(data);
		Database.workers.push(
			new Worker(
				Database.workers.length+1,
				json.name,
				json.surname,
				json.birthDate,
				RandomData.double(140, 180),
				RandomData.int(12, 100),
				RandomData.int(0, 100),
				RandomData.int(0, 100),
				RandomData.int(0, 14),
				RandomData.int(0, 14),
				RandomData.int(0, 100),
				RandomData.int(0, 100),
				RandomData.int(0, 100)
			)
		);
		return [ResponseCode.OK, {id: Database.workers.length+1}];
	});
	
	$httpBackend.whenPUT('ws/worker').respond(function(method, url, data) {
		var json = JSON.parse(data);

		for (var i = 0; i < Database.workers.length; ++i) {
			if (Database.workers[i].id == json.id) {
				Database.workers[i].name = json.name;
				Database.workers[i].surname = json.surname;
				Database.workers[i].birthDate = json.birthDate;
				return [ResponseCode.OK];
			}
		}
		return [ResponseCode.OK, {id: Database.workers.length+1}];
	});

	$httpBackend.whenGET(/^ws\/worker\/([0-9]+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
		for (var i = 0; i < Database.workers.length; ++i) {
			var worker = Database.workers[i];
			if (worker.id == params.id) {
				return [ResponseCode.OK, worker];
			}
		}
		return [ResponseCode.NOT_FOUND, 'ERROR.NOT_FOUND'];
	});


	$httpBackend.whenDELETE(/^ws\/worker\/([0-9]+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
		for (var i = 0; i < Database.workers.length; ++i) {
			var worker = Database.workers[i];
			if (worker.id == params.id) {
				Database.workers.splice(i, 1);
				return [ResponseCode.OK, {}];
			}
		}
		return [ResponseCode.NOT_FOUND, 'ERROR.NOT_FOUND'];
	});

}]);