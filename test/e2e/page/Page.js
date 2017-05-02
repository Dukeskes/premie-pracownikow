var Logger = require('../util/Logger.js');
var Class = require('../util/Class.js');

var Page = Class.extend({
	getName: function() {
		throw new Error('Method getName must by overridden in Page hierarchy');
	},
	getUriFragment: function() {
		throw new Error('Method getUriFragment must by overridden in Page hierarchy');
	},

	load: function() {
		var url = '#' + this.getUriFragment();
		Logger.step(this.getName(), 'Load with url = ' + url);
		browser.get(url);

		return this;
	},

	isVisible: function(elementLocator) {
		return element(elementLocator).isDisplayed();
	},

	setText: function(elementLocator, value) {
		Logger.step(this.getName(), 'Set value on element [' + elementLocator.toString() + '] = ' + value);
		element(elementLocator).sendKeys(value);
		return this;
	},
	click: function(elementLocator) {
		Logger.step(this.getName(), 'Click on element [' + elementLocator.toString() + ']');
		element(elementLocator).click();
		return this;
	}
});

module.exports = Page;