describe('Auth service ', function() {
	var $httpBackend;
	var $http;
	var $cookies;
	var service;

	beforeEach(angular.mock.module(APP_ID));
	beforeEach(angular.mock.inject(function(_$httpBackend_, _$http_, _$cookies_, $injector) {
		$httpBackend = _$httpBackend_;
		$http = _$http_;
		$cookies = _$cookies_;
		service = $injector.get('authService');

		delete $http.defaults.headers.common[CookieToken.AUTH];
		$cookies.remove(CookieToken.AUTH);
		$cookies.remove(CookieToken.ROLE);
	}));

	it('should store and remove auth token in cookies', function() {
		$httpBackend.whenPOST('ws/auth/logIn').respond(function() {
			return [ResponseCode.OK, new UserPrincipal(1, Role.ADMIN, 'hello_world')];
		});
		$httpBackend.whenPOST('ws/auth/logOut').respond(function() {
			return [ResponseCode.OK, {}];
		});

		expect($cookies.get(CookieToken.AUTH)).toBeUndefined();
		expect($cookies.get(CookieToken.ROLE)).toBeUndefined();

		service.logIn('hello', 'world').then(function() {
			expect($cookies.get(CookieToken.AUTH)).toBeDefined();
			expect($cookies.get(CookieToken.ROLE)).toBeDefined();
		}, function() {
			fail('should succeed');
		});

		service.logOut().then(function() {
			expect($cookies.get(CookieToken.AUTH)).toBeUndefined();
			expect($cookies.get(CookieToken.ROLE)).toBeUndefined();
		}, function() {
			fail('should succeed');
		});
		$httpBackend.flush();
	});

	it('should add auth token to http headers', function() {
		$httpBackend.whenPOST('ws/auth/logIn').respond(function() {
			return [ResponseCode.OK, new UserPrincipal(1, Role.ADMIN, 'hello_world')];
		});

		expect($http.defaults.headers.common[CookieToken.AUTH]).toBeUndefined();

		service.logIn('hello', 'world').then(function() {
			expect($http.defaults.headers.common[CookieToken.AUTH]).toBeDefined();
		}, function() {
			fail('should succeed');
		});
		$httpBackend.flush();
	});
});