var AppPage = require('./AppPage.js');

module.exports = AppPage.extend({
	getName: function() {
		return 'DashboardPage';
	},
	getUriFragment: function() {
		return arguments.callee.$.getUriFragment.apply(this) + '/dashboard';
	}
});