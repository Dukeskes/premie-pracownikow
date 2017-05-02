var Page = require('./Page.js');

module.exports = Page.extend({
	getName: function() {
		return 'AppPage';
	},
	getUriFragment: function() {
		return '/app';
	},

	logOut: function() {
		return this.click(by.className('btn-primary'));
	}
});