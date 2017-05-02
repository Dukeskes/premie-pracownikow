var Pages = {};

(function() {
	[
		'Login',
		'Registration',
		'Dashboard'
	].forEach(function(pageName) {
		var pageFilePath = './' + pageName + 'Page.js';
		Pages[pageName] = _objectProvider(require(pageFilePath));
	});

	function _objectProvider(objClass) {
		return function() {
			return new objClass();
		}
	}
})();

module.exports = Pages;