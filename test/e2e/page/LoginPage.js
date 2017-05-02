var Page = require('./Page.js');

module.exports = Page.extend({
	getName: function() {
		return 'LoginPage';
	},
	getUriFragment: function() {
		return '/login';
	},

	setUsername: function(value) {
		return this.setText(by.model('vm.credentials.login'), value);
	},
	setPassword: function(value) {
		return this.setText(by.model('vm.credentials.password'), value);
	},

	logIn: function() {
		return this.click(by.className('btn-primary'));
	},

	hasError: function() {
		return this.isVisible(by.className('error-msg'));
	},

	defaultAuth: function() {
		return this.load()
			.setUsername('klekot')
			.setPassword('123')
			.logIn();
	}
});