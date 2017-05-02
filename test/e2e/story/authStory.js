var Logger = require('../util/Logger.js');
var Pages = require('../page/Pages.js');

describe('Auth', function() {
	Logger.storyStart(this.getFullName());

	var loginPage = Pages.Login();
	var registrationPage = Pages.Registration();
	var dashboardPage = Pages.Dashboard();

	beforeEach(function() {
		browser.manage().deleteAllCookies();
	});

	var testName = 'should access authorized user to restricted page';
	it(testName, function() {
		Logger.caseStart('should access authorized user to restricted page');

		loginPage.defaultAuth();

		dashboardPage.load();
		expect(browser.getLocationAbsUrl()).toBe(dashboardPage.getUriFragment());
	});

	it('should not access unauthorized user to restricted page', function() {
		Logger.caseStart('should not access unauthorized user to restricted page');

		dashboardPage.load();
		expect(browser.getLocationAbsUrl()).toBe(loginPage.getUriFragment());
	});

	it('should log in newly registered user', function() {
		Logger.caseStart('should log in newly registered user');

		loginPage.load();
		expect(loginPage.hasError()).toBe(false);

		loginPage.setUsername('michal.klekotko@ensteam.com')
			.setPassword('Test1234')
			.logIn();
		expect(loginPage.hasError()).toBe(true);

		registrationPage.load()
			.setUsername('michal.klekotko@ensteam.com')
			.setPassword('Test1234')
			.signIn();
		expect(browser.getLocationAbsUrl()).toBe(loginPage.getUriFragment());

		loginPage.setUsername('michal.klekotko@ensteam.com')
			.setPassword('Test1234')
			.logIn();
		expect(browser.getLocationAbsUrl()).not.toBe(loginPage.getUriFragment());
	});
});