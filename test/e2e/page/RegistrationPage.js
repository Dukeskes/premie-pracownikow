var Page = require('./Page.js');

module.exports = Page.extend({
	getName: function() {
		return 'RegistrationPage';
	},
	getUriFragment: function() {
		return '/registration';
	},

	setUsername: function(value) {
		return this.setText(by.model('vm.item.username'), value);
	},
	setPassword: function(value) {
		return this.setText(by.model('vm.item.password'), value);
	},

	signIn: function() {
		return this.click(by.className('btn-primary'));
	}
});