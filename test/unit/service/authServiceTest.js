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
		$cookies.remove(CookieToken.USER);
	}));

	it('should store and remove auth token in cookies', function() {
		$httpBackend.whenPOST('ws/auth/logIn').respond(function() {
			return [ResponseCode.OK, new UserPrincipal(1, Role.ADMIN, 'hello_world', 'test')];
		});
		$httpBackend.whenPOST('ws/auth/logOut').respond(function() {
			return [ResponseCode.OK, {}];
		});

		expect($cookies.get(CookieToken.AUTH)).toBeUndefined();
		expect($cookies.get(CookieToken.ROLE)).toBeUndefined();
		expect($cookies.get(CookieToken.USER)).toBeUndefined();

		service.logIn('hello', 'world').then(function() {
			expect($cookies.get(CookieToken.AUTH)).toBeDefined();
			expect($cookies.get(CookieToken.ROLE)).toBeDefined();
			expect($cookies.get(CookieToken.USER)).toBeDefined();
		}, function() {
			fail('should succeed');
		});

		service.logOut().then(function() {
			expect($cookies.get(CookieToken.AUTH)).toBeUndefined();
			expect($cookies.get(CookieToken.ROLE)).toBeUndefined();
			expect($cookies.get(CookieToken.USER)).toBeUndefined();
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

	it('should have authorization for each state', function() {
		for(var token in State.Token) {
			expect(function() {
				service.isStateAllowed(State.Token[token]);
			}).not.toThrow();
		}
	});
});