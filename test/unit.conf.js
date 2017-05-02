var baseConfig = require('./base.conf.js');

module.exports = function(config) {
	var base = baseConfig();
	base.files = [
		'bower_components/angular/angular.js',
		'bower_components/angular-cookies/angular-cookies.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/ng-table/dist/ng-table.js',
		'bower_components/ui-select/dist/select.js',
		'bower_components/ng-dialog/js/ngDialog.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/AngularJS-Toaster/toaster.js',
		'bower_components/angular-translate/angular-translate.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/ng-file-upload/ng-file-upload.js',
		'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',

		'ng/enum/**/*.js',
		'ng/util/**/*.js',
		'ng/model/**/*.js',
		'ng/app.js',
		'ng/config/http.js',
		'ng/service/**/*.js',
		'ng/dialog/**/*.js',
		'ng/controller/**/*.js',
		'ng/mock/value/**/*.js',
		'test/unit/**/*.js'
	];

	config.set(base);
};
