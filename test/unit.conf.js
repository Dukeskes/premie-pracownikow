module.exports = function(config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',

		files: [
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-cookies/angular-cookies.js',
			'app/bower_components/angular-ui-router/release/angular-ui-router.js',
			'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'app/bower_components/ng-table/dist/ng-table.js',
			'app/bower_components/angular-ui-select/dist/select.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/AngularJS-Toaster/toaster.js',
			'app/bower_components/angular-translate/angular-translate.js',

			'app/js/enum/**/*.js',
			'app/js/util/**/*.js',
			'app/js/model/**/*.js',
			'app/js/app.js',
			'app/js/config/http.js',
			'app/js/service/**/*.js',
			'app/js/dialog/**/*.js',
			'app/js/controller/**/*.js',
			'app/js/mock/value/**/*.js',
			'test/unit/**/*.js'
		],

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		urlRoot: '/__karma__/'
	});
};
