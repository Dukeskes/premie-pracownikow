var baseConfig = require('./base.conf.js');

module.exports = function(config) {
	var base = baseConfig();
	base.frameworks = ['ng-scenario'].concat(base.frameworks);
	base.files = [
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/ng-table/dist/ng-table.js',
		'bower_components/ui-select/dist/select.js',
		'bower_components/ng-dialog/js/ngDialog.js',
		'bower_components/AngularJS-Toaster/toaster.js',
		'bower_components/angular-translate/angular-translate.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/ng-file-upload/ng-file-upload.js',
		'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',

		'ng/enum/**/*.js',
		'ng/util/**/*.js',
		'ng/model/**/*.js',
		'ng/app.js',
		'ng/config/**/*.js',
		'ng/service/**/*.js',
		'ng/dialog/**/*.js',
		'ng/controller/**/*.js',
		'ng/mock/value/**/*.js',
		'test/e2e/**/*.js',

		'ng/template/**/*.html'
	];
	base.proxies = {
		'/': 'http://localhost:8888/'
	};

	config.set(base);
};