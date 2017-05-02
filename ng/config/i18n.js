angular.module(APP_ID).config(['$translateProvider', function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: 'language/locale-',
			suffix: '.json'
		}]
	});

	$translateProvider.preferredLanguage('pl');
	$translateProvider.useSanitizeValueStrategy('escape');
}]);