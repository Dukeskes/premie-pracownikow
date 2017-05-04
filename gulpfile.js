var gulp = require('gulp');
var path = require('path');
var sequence = require('run-sequence');
var argv = require('yargs').argv;

var connect = require('gulp-connect');
var proxyMiddleware = require('http-proxy-middleware');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var replace = require('gulp-html-replace');
var rimraf = require('gulp-rimraf');
var filenames = require('gulp-filenames');
var change = require('gulp-change');
//var karma = require('karma');
var protractor = require('gulp-angular-protractor');

var LIB_PATHS = {
	CSS: [
		'app/bower_components/animate.css/animate.css',
		'app/bower_components/bootstrap/dist/css/bootstrap.css',
		'app/bower_components/font-awesome/css/font-awesome.css',
		'app/bower_components/ng-table/dist/ng-table.css',
		'app/bower_components/angular-ui-select/dist/select.css',
		'app/bower_components/AngularJS-Toaster/toaster.css'
	],
	JS: [
		'app/bower_components/jquery/dist/jquery.js',
		'app/bower_components/bootstrap/dist/js/bootstrap.js',
		'app/bower_components/angular/angular.js',
		'app/bower_components/angular-cookies/angular-cookies.js',
		'app/bower_components/angular-ui-router/release/angular-ui-router.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'app/bower_components/ng-table/dist/ng-table.js',
		'app/bower_components/angular-ui-select/dist/select.js',
		'app/bower_components/angular-translate/angular-translate.js',
		'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
		'app/bower_components/AngularJS-Toaster/toaster.js'
	]
};
var APP_PATHS = {
	INDEX: 'app/index.html',
	APP: 'app/js/app.js',
	TEMPLATE: ['app/**/*.html', '!app/index*.html'],
	IMG: ['app/img/**/*'],
	I18N: ['app/i18n/**/*'],
	SASS: ['app/sass/**/*.scss'],
	CSS: ['app/css/**/*.css'],
	FONT: ['app/fonts/**/*'],
	JS: [
		'app/js/enum/**/*.js',
		'app/js/util/**/*js',
		'app/js/model/**/*.js',
		'app/js/config/**/*.js',
		'app/js/service/**/*.js',
		'app/js/directive/**/*.js',
		'app/js/dialog/**/*.js',
		'app/js/controller/**/*.js'
	]
};
var DEV_PATHS = {
	INDEX: 'app/index-template.html',
	APP: 'app/js/app-dev.js',
	MOCK_JS: [
		'app/js/mock/util/**/*.js',
		'app/js/mock/config/**/*.js',
		'app/js/mock/value/**/*.js',
		'app/js/mock/ws/**/*.js'
	],
	LIB_JS: [
		'app/bower_components/angular-mocks/angular-mocks.js'
	]
};
// var TEST_PATHS = {
// 	UNIT_CONFIG: 'test/unit.conf.js',
// 	E2E_CONFIG: 'test/e2e.conf.js',
// 	E2E_STORY: [
// 		'test/e2e/story/**/*.js'
// 	]
// };

var APP_BASE = {
	DIR: 'app/',

	pathsFromRelative: function(paths) {
		var offset = this.DIR.length;
		var result = [];
		for(var i = 0; i < paths.length; ++i) {
			var path = paths[i];
			result.push(paths[i].substr((path.indexOf('./') === 0) ? offset + 2 : offset));
		}

		return result;
	},
	pathsFromAbsolute: function(paths) {
		var offset = process.cwd().length + this.DIR.length + 1;
		var result = [];
		for(var i = 0; i < paths.length; ++i) {
			result.push(paths[i].substr(offset));
		}

		return result;
	}
};
var DIST_BASE = {
	DIR: 'dist/'
};

var WS_PROXY = {
	MAPPING: '/ws',
	TARGET: 'http://localhost:8080/rest-jee-1.0.0-SNAPSHOT',
	PATH: '/rest-jee-1.0.0-SNAPSHOT',
	REVERSE_COOKIE_PATH: '/',
	MIDDLEWARE: function(connect, opt) {
		return [
			proxyMiddleware(WS_PROXY.MAPPING, {
				target: WS_PROXY.TARGET,
				changeOrigin: true,
				onProxyRes: function(proxyRes, req, res) {
					var setCookie = proxyRes.headers['set-cookie'];
					if(setCookie) {
						for(var i in setCookie) {
							setCookie[i] = setCookie[i].replace('=' + WS_PROXY.PATH, '=' + WS_PROXY.REVERSE_COOKIE_PATH);
						}
					}
				}
			})
		];
	}
};

gulp.task('clean', function() {
	return gulp.src([DIST_BASE.DIR, APP_PATHS.INDEX, DEV_PATHS.APP])
		.pipe(rimraf());
});

gulp.task('lint:app', function() {
	return gulp.src([APP_PATHS.APP].concat(APP_PATHS.JS))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});
gulp.task('lint:mock', function() {
	return gulp.src(DEV_PATHS.MOCK_JS)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});
gulp.task('lint', ['lint:app', 'lint:mock']);

gulp.task('sass', function() {
	return gulp.src(APP_BASE.DIR + 'sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(APP_BASE.DIR + 'css/'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	return gulp.src([APP_PATHS.INDEX].concat(APP_PATHS.TEMPLATE))
		.pipe(connect.reload());
});

gulp.task('disable-animations', function() {
	var lastPartIndex = APP_PATHS.INDEX.lastIndexOf('/') + 1;

	return gulp.src(APP_PATHS.INDEX)
		.pipe(change(function(content) {
			var startIndexOfBody = content.indexOf('<body');
			var endIndexOfBody = content.indexOf('>', startIndexOfBody);
			var body = content.substring(startIndexOfBody, endIndexOfBody);

			var indexOfClass = body.indexOf('class="');
			if(indexOfClass !== -1) {
				body = body.substr(0, indexOfClass) +
					'class="no-animations ' +
					body.substr(indexOfClass + 7)
			} else {
				body += ' class="no-animations"'
			}

			return content.substr(0, startIndexOfBody) +
					body +
					content.substr(endIndexOfBody);
		}))
		.pipe(gulp.dest(APP_PATHS.INDEX.substr(0, lastPartIndex)));
});

gulp.task('change:app', function() {
	var lastPartIndex = DEV_PATHS.APP.lastIndexOf('/') + 1;

	return gulp.src(APP_PATHS.APP)
		.pipe(change(function(content) {
			return content.substr(0, content.lastIndexOf('])')) + ', \'ngMockE2E\']);';
		}))
		.pipe(rename(DEV_PATHS.APP.substr(lastPartIndex)))
		.pipe(gulp.dest(DEV_PATHS.APP.substr(0, lastPartIndex)));
});

gulp.task('filenames:dev-js', ['change:app'], function() {
	return gulp.src([DEV_PATHS.APP].concat(APP_PATHS.JS))
		.pipe(filenames('dev-js'));
});
gulp.task('filenames:prod-js', function() {
	return gulp.src([APP_PATHS.APP].concat(APP_PATHS.JS))
		.pipe(filenames('prod-js'));
});
gulp.task('filenames:app-css', function() {
	return gulp.src(APP_PATHS.CSS)
		.pipe(filenames('app-css'));
});
gulp.task('filenames:mock-js', function() {
	return gulp.src(DEV_PATHS.LIB_JS.slice().concat(DEV_PATHS.MOCK_JS))
		.pipe(filenames('mock-js'));
});

gulp.task('dev:replace', ['filenames:dev-js', 'filenames:app-css', 'filenames:mock-js'], function() {
	var lastPartIndex = APP_PATHS.INDEX.lastIndexOf('/') + 1;

	return gulp.src(DEV_PATHS.INDEX)
		.pipe(replace({
			'lib-css': APP_BASE.pathsFromRelative(LIB_PATHS.CSS),
			'lib-js': APP_BASE.pathsFromRelative(LIB_PATHS.JS),
			'app-css': APP_BASE.pathsFromAbsolute(filenames.get('app-css', 'full')),
			'app-js': APP_BASE.pathsFromAbsolute(filenames.get('dev-js', 'full')),
			'mock-js': APP_BASE.pathsFromAbsolute(filenames.get('mock-js', 'full'))
		}))
		.pipe(rename(APP_PATHS.INDEX.substr(lastPartIndex)))
		.pipe(gulp.dest(APP_PATHS.INDEX.substr(0, lastPartIndex)));
});
gulp.task('prod:replace', ['filenames:prod-js', 'filenames:app-css'], function() {
	var lastPartIndex = APP_PATHS.INDEX.lastIndexOf('/') + 1;

	return gulp.src(DEV_PATHS.INDEX)
		.pipe(replace({
			'lib-css': APP_BASE.pathsFromRelative(LIB_PATHS.CSS),
			'lib-js': APP_BASE.pathsFromRelative(LIB_PATHS.JS),
			'app-css': APP_BASE.pathsFromAbsolute(filenames.get('app-css', 'full')),
			'app-js': APP_BASE.pathsFromAbsolute(filenames.get('prod-js', 'full'))
		}))
		.pipe(rename(APP_PATHS.INDEX.substr(lastPartIndex)))
		.pipe(gulp.dest(APP_PATHS.INDEX.substr(0, lastPartIndex)));
});
gulp.task('dist:replace', function() {
	var lastPartIndex = APP_PATHS.INDEX.lastIndexOf('/') + 1;

	return gulp.src(DEV_PATHS.INDEX)
		.pipe(replace({
			'lib-css': APP_BASE.pathsFromRelative(LIB_PATHS.CSS),
			'lib-js': APP_BASE.pathsFromRelative(LIB_PATHS.JS),
			'app-css': 'css/app.min.css',
			'app-js': 'js/app.min.js'
		}))
		.pipe(rename(APP_PATHS.INDEX.substr(lastPartIndex)))
		.pipe(gulp.dest(DIST_BASE.DIR));
});

gulp.task('copy:css', function() {
	return gulp.src(APP_PATHS.CSS)
		.pipe(concat('app.min.css'))
		.pipe(minify({
			comments: true,
			spare: true
		}))
		.pipe(gulp.dest(DIST_BASE.DIR + 'css'))
});
gulp.task('copy:font', function() {
	return gulp.src(APP_PATHS.FONT)
		.pipe(gulp.dest(DIST_BASE.DIR + 'fonts'));
});
gulp.task('copy:js', function() {
	return gulp.src([APP_PATHS.APP].concat(APP_PATHS.JS))
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(DIST_BASE.DIR + 'js'));
});
gulp.task('copy:bower-components', function() {
	return gulp.src(APP_BASE.DIR + 'bower_components/**')
		.pipe(gulp.dest(DIST_BASE.DIR + 'bower_components'));
});
gulp.task('copy:img-files', function() {
	return gulp.src(APP_PATHS.IMG)
		.pipe(gulp.dest(DIST_BASE.DIR + 'img'));
});
gulp.task('copy:i18n-files', function() {
	return gulp.src(APP_PATHS.I18N)
		.pipe(gulp.dest(DIST_BASE.DIR + 'i18n'));
});
gulp.task('copy:html-files', function() {
	return gulp.src(APP_PATHS.TEMPLATE)
		.pipe(gulp.dest(DIST_BASE.DIR));
});
gulp.task('dist:copy', ['copy:css', 'copy:font', 'copy:js', 'copy:bower-components', 'copy:img-files', 'copy:i18n-files', 'copy:html-files', 'dist:replace']);

gulp.task('dev:connect', function() {
	return connect.server({
		root: APP_BASE.DIR,
		port: 8888,
		livereload: true
	});
});
gulp.task('prod:connect', function() {
	return connect.server({
		root: APP_BASE.DIR,
		port: 8888,
		livereload: true,
		middleware: WS_PROXY.MIDDLEWARE
	});
});
gulp.task('dist:connect', function() {
	return connect.server({
		root: DIST_BASE.DIR,
		port: 8888,
		middleware: WS_PROXY.MIDDLEWARE
	});
});
//
// gulp.task('test:unit', function(done) {
// 	new karma.Server({
// 		configFile: path.resolve(TEST_PATHS.UNIT_CONFIG),
// 		singleRun: true,
// 		autoWatch: false
// 	}, done).start();
// });
// gulp.task('test:e2e:stories', function(done) {
// 	connect.server({
// 		root: APP_BASE.DIR,
// 		port: 8888
// 	});
//
// 	gulp.src(TEST_PATHS.E2E_STORY)
// 		.pipe(protractor({
// 			configFile: TEST_PATHS.E2E_CONFIG,
// 			autoStartStopServer: true,
// 			debug: false
// 		}))
// 		.on('error', function(e) {
// 			console.log(e);
// 			connect.serverClose();
// 		})
// 		.on('end', function() {
// 			connect.serverClose();
// 			done();
// 		});
// });
// gulp.task('test:e2e:dev', ['dev:compile'], function(done) {
// 	sequence(
// 		'disable-animations',
// 		'test:e2e:stories',
// 		done
// 	)
// });
// gulp.task('test:e2e', ['prod:compile'], function(done) {
// 	sequence(
// 		'disable-animations',
// 		'test:e2e:stories',
// 		done
// 	)
// });
// gulp.task('test', function() {
// 	sequence(
// 		'test:unit',
// 		'test:e2e:dev'
// 	);
// });

gulp.task('dev:compile', ['lint', 'sass', 'dev:replace']);
gulp.task('dev:watch', function() {
	gulp.watch([APP_PATHS.APP].concat(APP_PATHS.JS), ['lint:app']);
	gulp.watch(APP_PATHS.SASS, ['sass']);
	gulp.watch([APP_PATHS.INDEX].concat(APP_PATHS.TEMPLATE), ['html']);
	gulp.watch(DEV_PATHS.MOCK_JS, ['lint:mock']);

	//new karma.Server({
		//configFile: path.resolve(TEST_PATHS.UNIT_CONFIG)
	//}).start();
});
gulp.task('dev', function() {
	sequence(
		'dev:compile',
		'dev:connect',
		'dev:watch'
	);
});

gulp.task('prod:compile', ['lint:app', 'sass', 'prod:replace']);
gulp.task('prod:watch', function() {
	gulp.watch([APP_PATHS.APP].concat(APP_PATHS.JS), ['lint:app']);
	gulp.watch(APP_PATHS.SASS, ['sass']);
	gulp.watch([APP_PATHS.INDEX].concat(APP_PATHS.TEMPLATE), ['html']);
});
gulp.task('prod', function() {
	sequence(
		'prod:compile',
		'prod:connect',
		'prod:watch'
	);
});

gulp.task('dist:compile', ['lint:app', 'sass']);
// gulp.task('dist:test', function(done) {
// 	sequence(
// 		'dev:compile',
// 		'test',
// 		done
// 	);
// });
gulp.task('dist:install', function(done) {
	sequence(
		'dist:compile',
		'clean',
		'dist:copy',
		done
	);
});
gulp.task('dist', function() {
	if(argv.skipTests) {
		sequence(
			'dist:install'
		);
	} else {
		sequence(
			//'dist:test',
			'dist:install',
			'dist:connect'
		);
	}
});