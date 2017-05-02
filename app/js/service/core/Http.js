angular.module(APP_ID).service('http', ['$http', '$q', '$filter', 'alert', function($http, $q, $filter, alert) {
	this.get = function(url, config) {
		return new HttpRequest($http.get(url, config));
	};
	this.post = function(url, data, config) {
		return new HttpRequest($http.post(url, data, config));
	};
	this.put = function(url, data, config) {
		return new HttpRequest($http.put(url, data, config));
	};
	this.delete = function(url, config) {
		return new HttpRequest($http.delete(url, config));
	};

	var HttpRequest = function(httpPromise) {
		this.httpPromise = httpPromise;
	};
	HttpRequest.prototype.resolve = function(resolve) {
		return _build(this.httpPromise, resolve, _defaultReject);
	};
	HttpRequest.prototype.reject = function(reject) {
		return _build(this.httpPromise, _defaultResolve, reject);
	};
	HttpRequest.prototype.send = function(resolve, reject) {
		return _build(this.httpPromise, resolve, reject);
	};
	HttpRequest.prototype.then = function(resolve, reject) {
		_build(this.httpPromise, _defaultResolve, _defaultReject).then(resolve, reject);
	};

	function _build(httpPromise, proxyResolve, proxyReject) {
		return $q(function(resolve, reject) {
			httpPromise.then(function(response) {
				response = proxyResolve(response);
				Optional.call(resolve, [response]);
			}, function(response) {
				response = proxyReject(response);
				Optional.call(reject, [response]);
			});
		});
	}

	function _defaultResolve(response) {
		return response.data;
	}

	function _defaultReject(response) {
		if(response.status !== ResponseCode.UNAUTHORIZED) {
			var errorToken = Optional.get(response.data, 'ERROR.UNKNOWN');
			alert.error($filter('translate')(errorToken));
		}

		return response.data;
	}
}]);