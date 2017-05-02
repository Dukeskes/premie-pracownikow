exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://localhost:8888',

	onPrepare: function() {
		browser.driver
			.manage()
			.window()
			.setSize(1024, 768);
	}
};