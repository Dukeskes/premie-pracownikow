angular.module(APP_ID).config(['$translateProvider', function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: 'i18n/locale-',
			suffix: '.json'
		}]
	});

	$translateProvider.preferredLanguage('pl');
	$translateProvider.useSanitizeValueStrategy('escape');
}]);