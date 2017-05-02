describe("State test", function() {
	it('should navigate to public pages', function() {
		browser().navigateTo('/#/registration');
		expect(browser().location().path()).toBe('/registration');

		browser().navigateTo('/#/login');
		expect(browser().location().path()).toBe('/login');
	});

	it('should redirect to login or default child', function() {
		browser().navigateTo('/#/');
		expect(browser().location().path()).toBe('/login');
	});
});