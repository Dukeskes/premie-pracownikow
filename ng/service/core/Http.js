angular.module(APP_ID).service('http', ['$http', '$q', '$filter', 'toaster', function($http, $q, $filter, toaster) {
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
				if(resolve) {
					resolve(response);
				}
			}, function(response) {
				response = proxyReject(response);
				if(reject) {
					reject(response);
				}
			});
		});
	}

	function _defaultResolve(response) {
		return response.data;
	}

	function _defaultReject(response) {
		var errorToken = Optional.get(response.data, 'UNKNOWN');
		toaster.pop('error', '', $filter('translate')('ERROR.' + errorToken), 3000);

		return response.data;
	}
}]);