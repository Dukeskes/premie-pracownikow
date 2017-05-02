angular.module(APP_ID).config(['$provide', function($provide) {
	var delayEnabled = false;
	var excludedUrls = [
		/^template\//,
		/^i18n\//,
		/^fonts\//,
		/^img\//
	];

	$provide.decorator('$httpBackend', function($delegate) {
		var proxy = function(method, url, data, callback, headers) {
			var interceptor = function() {
				var _this = this;
				var _arguments = arguments;

				if(_shouldDelay(url)) {
					setTimeout(function() {
						callback.apply(_this, _arguments);
					}, 500);
				} else {
					callback.apply(_this, _arguments);
				}
			};

			return $delegate.call(this, method, url, data, interceptor, headers);
		};
		for(var key in $delegate) {
			proxy[key] = $delegate[key];
		}

		return proxy;
	});

	function _shouldDelay(url) {
		if(!delayEnabled) {
			return false;
		}

		for(var i = 0; i < excludedUrls.length; ++i) {
			if(url.match(excludedUrls[i])) {
				return false;
			}
		}
		return true;
	}
}]);