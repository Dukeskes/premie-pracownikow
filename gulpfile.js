var gulp = require('gulp');
var path = require('path');
var sequence = require('run-sequence');

var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var proxyMiddleware = require('http-proxy-middleware');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var replace = require('gulp-html-replace');
var rimraf = require('gulp-rimraf');
var filenames = require('gulp-filenames');
var change = require('gulp-change');
var karma = require('karma');
var protractor = require('gulp-angular-protractor');
var csscomb = require('gulp-csscomb');
var nodemon = require('gulp-nodemon');

var LIB_PATHS = {
    CSS: [
        'bower_components/animate.css/animate.css',
        'bower_components/tether/dist/css/tether.css',
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/ng-table/dist/ng-table.css',
        'bower_components/ui-select/dist/select.css',
        'bower_components/ng-dialog/css/ngDialog.css',
        'bower_components/ng-dialog/css/ngDialog-theme-default.css',
        'bower_components/AngularJS-Toaster/toaster.css'
    ],
    JS: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/tether/dist/js/tether.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/ng-table/dist/ng-table.js',
        'bower_components/ui-select/dist/select.js',
        'bower_components/ng-dialog/js/ngDialog.js',
        'bower_components/angular-translate/angular-translate.js',
        'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'bower_components/AngularJS-Toaster/toaster.js'
    ]
};
var APP_PATHS = {
    INDEX: 'index.html',
    APP: 'ng/app.js',
    TEMPLATE: ['ng/**/*.html', '!ng/index*.html'],
    IMG: ['assets/img/**/*'],
    I18N: ['language/**/*'],
    SCSS: ['assets/scss/**/*.scss'],
    CSS: ['assets/css/**/*.css'],
    FONT: ['assets/fonts/*'],
    JS: [
        'ng/enum/**/*.js',
        'ng/util/**/*.js',
        'ng/model/**/*.js',
        'ng/config/**/*.js',
        'ng/service/**/*.js',
        'ng/directive/**/*.js',
        'ng/dialog/**/*.js',
        'ng/controller/**/*.js'
    ],
    NODE: 'server.js'
};
var DEV_PATHS = {
    INDEX: 'template/index-template.html',
    APP: 'ng/app-dev.js',
    MOCK_JS: [
        'ng/mock/util/**/*.js',
        'ng/mock/value/**/*.js',
        'ng/mock/ws/**/*.js'
    ],
    CLEAN_HTML: [
        'html/**/*html'
    ],
    LIB_JS: [
        'bower_components/angular-mocks/angular-mocks.js'
    ],
    UNIT_TEST_JS: [
        'test/unit/**/*.js'
    ]
};

var APP_BASE = {
    DIR: '',

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
    TARGET: 'http://localhost:3333/',
    PATH: '/',
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
gulp.task('lint:test', function() {
    return gulp.src(DEV_PATHS.UNIT_TEST_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('lint', ['lint:app', 'lint:mock', 'lint:test']);

gulp.task('comb', function() {
    return gulp.src( APP_PATHS.SCSS )
        .pipe(csscomb());
});

gulp.task('sass', function() {
    return gulp.src( './assets/scss/main.scss' )
        .pipe(sass().on('error', sass.logError))
        .pipe(csscomb())
        .pipe(gulp.dest(APP_BASE.DIR + 'assets/css/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src( DEV_PATHS.CLEAN_HTML )
        .pipe(connect.reload());
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

gulp.task('test:unit', function(done) {
    new karma.Server({
        configFile: path.resolve('test/unit.conf.js'),
        singleRun: true,
        autoWatch: false
    }, done).start();
});

gulp.task('test', ['test:unit']);

gulp.task('dev:connect', function() {
    return connect.server({
        root: APP_BASE.DIR,
        port: 8888,
        livereload: true,
        middleware: WS_PROXY.MIDDLEWARE
    });
});

gulp.task('dev:nodemon', function() {
    nodemon({
        script: APP_PATHS.NODE,
        ext: 'js',
        ignore: ['ng*', 'html*', 'language*', 'bower_components*', 'template*', 'assets*', 'index.html', 'index-*.html']
    });
});

gulp.task('prod:connect', function() {
    console.log(WS_PROXY.MIDDLEWARE);
    return connect.server({
        root: APP_BASE.DIR,
        port: 8888,
        livereload: true,
        middleware: WS_PROXY.MIDDLEWARE
    });
});

gulp.task('prod:nodemon', function() {
    nodemon({
        script: APP_PATHS.NODE,
        ext: 'js',
        ignore: ['ng/*', 'html/*', 'language/*', 'bower_components/*', 'template/*', 'assets/*']
    });
});

gulp.task('dev:compile', ['lint', 'comb', 'sass', 'dev:replace']);

gulp.task('dev:watch', function() {
    gulp.watch([APP_PATHS.APP].concat(APP_PATHS.JS), ['lint:app']);
    gulp.watch(APP_PATHS.SCSS, ['comb', 'sass']);
    gulp.watch([APP_PATHS.INDEX].concat(APP_PATHS.TEMPLATE), ['html']);
    gulp.watch(DEV_PATHS.UNIT_TEST_JS, ['lint:test']);
    gulp.watch(DEV_PATHS.MOCK_JS, ['lint:mock']);

    new karma.Server({
        configFile: path.resolve('./test/unit.conf.js')
    }).start();
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
    gulp.watch(APP_PATHS.SCSS, ['comb', 'sass']);
    gulp.watch([APP_PATHS.INDEX].concat(APP_PATHS.TEMPLATE), ['html']);
});

gulp.task('prod', function() {
    sequence(
        'prod:compile',
        'prod:nodemon',
        'prod:connect',
        'prod:watch'
    );
});

gulp.task('backend', function() {
    sequence(
        'prod:compile',
        'prod:nodemon',
        'prod:watch'
    );
});