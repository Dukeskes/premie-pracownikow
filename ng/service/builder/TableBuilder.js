angular.module(APP_ID).service('tableBuilder', ['$q', '$location', '$state', '$stateParams', 'spinner', 'ngTableParams', function($q, $location, $state, $stateParams, spinner, ngTableParams) {
	this.createTable = function(entriesFetcher, spinnerKey) {
		return new Table(entriesFetcher);
	};

	var Table = function(entriesFetcher, spinnerKey) {
		var _firstLoad = true;
		var _keyFilterMap = {};
		var _keyOrderMap = {};

		var _params = _resolveParams();

		var _ngTableParams = null;

		this.limit = function(limit) {
			_params.page = 1;
			_params.count = limit;
			return this;
		};
		this.filter = function(filter) {
			_params.page = 1;
			_keyFilterMap[filter.key] = filter;
			return this;
		};
		this.order = function(order) {
			_params.page = 1;
			_keyOrderMap[order.key] = order;
			return this;
		};
		this.page = function(page) {
			_params.page = page;
			return this;
		};
		this.getParams = function() {
			return _params;
		};

		this.reload = function() {
			if(_ngTableParams) {
				_ngTableParams.page(_params.page);
				_ngTableParams.count(_params.count);
				_ngTableParams.reload();
			}
		};

		this.fetchEntries = function() {
			_startSpinner();
			var fetcherParams = _resolveFetcherParams();

			if(_firstLoad) {
				_firstLoad = false;
			} else {
				$state.transitionTo(
					$state.$current,
					angular.extend($stateParams, {
						page: _params.page,
						filters: (fetcherParams.filters.length > 0) ? JSON.stringify(fetcherParams.filters) : null,
						orders: (fetcherParams.orders.length > 0) ? JSON.stringify(fetcherParams.orders) : null
					}),
					{
						notify: false
					}
				);
			}

			return $q(function(resolve, reject) {
				entriesFetcher(fetcherParams)
					.then(function(data) {
						if(resolve) {
							resolve(data);
						}
						_stopSpinner();
					}, function(data) {
						if(reject) {
							reject(data);
						}
						_stopSpinner();
					});
			});
		};

		this.toNgTableParams = function() {
			if(!_ngTableParams) {
				var _this = this;
				_ngTableParams = new ngTableParams(_params, {
					counts: [],
					getData: function($defer, ngParams) {
						_params.page = ngParams.page();
						_params.count = ngParams.count();

						_this.fetchEntries()
							.then(function(data) {
								$defer.resolve(data.entries);
								ngParams.total(data.numberOfAll);
							}, $defer.reject);
					}
				});
			}

			return _ngTableParams;
		};

		function _resolveParams() {
			var queryParams = $location.search();

			return {
				count: Optional.get(queryParams.count, 10),
				page: Optional.get(queryParams.page, 1),
				filters: (queryParams.filters) ? JSON.parse(queryParams.filters) : [],
				orders: (queryParams.orders) ? JSON.parse(queryParams.orders) : []
			};
		}

		function _resolveFetcherParams() {
			var entry, key;
			var count = _params.count;
			var offset = (_params.page - 1) * count;

			var filters = [];
			for(key in _keyFilterMap) {
				entry = _keyFilterMap[key];
				if(FilterType.ALL !== entry.type) {
					filters.push(entry);
				}
			}
			var orders = [];
			for(key in _keyOrderMap) {
				entry = _keyOrderMap[key];
				if(OrderType.DEFAULT !== entry.type) {
					orders.push(_keyOrderMap[key]);
				}
			}

			return {
				offset: offset,
				limit: count,
				filters: filters,
				orders: orders
			};
		}

		function _startSpinner() {
			if(Optional.isDefined(spinnerKey)) {
				spinner.start(spinnerKey);
			}
		}
		function _stopSpinner() {
			if(Optional.isDefined(spinnerKey)) {
				spinner.stop(spinnerKey);
			}
		}
	};

	var QueryBuilder = {
		all: function(key) {
			return new Filter(FilterType.ALL, key, null);
		},
		like: function(key, value) {
			return new Filter(FilterType.LIKE, key, value);
		},
		equal: function(key, value) {
			return new Filter(FilterType.EQ, key, value);
		},
		greaterOrEqual: function(key, value) {
			return new Filter(FilterType.GR_EQ, key, value);
		},
		lessOrEqual: function(key, value) {
			return new Filter(FilterType.LS_EQ, key, value);
		},
		between: function(key, start, end) {
			return new Filter(FilterType.BETWEEN, key, start + ';' + end);
		},
		in: function(key, values) {
			return new Filter(FilterType.IN, key, values.join(';'));
		},

		asc: function(key) {
			return new Order(OrderType.ASC, key);
		},
		desc: function(key) {
			return new Order(OrderType.DESC, key);
		},
		defaultOrder: function(key) {
			return new Order(OrderType.DEFAULT, key);
		}
	};

	var Filter = function(type, key, value) {
		this.type = type;
		this.key = key;
		this.value = value;
	};
	var FilterType = {
		ALL: 'ALL',
		LIKE: 'LIKE',
		EQ: 'EQ',
		GR_EQ: 'GR_EQ',
		LS_EQ: 'LS_EQ',
		BETWEEN: 'BETWEEN',
		IN: 'IN'
	};

	var Order = function(type, key) {
		this.type = type;
		this.key = key;
	};
	var OrderType = {
		ASC: 'ASC',
		DESC: 'DESC',
		DEFAULT: 'DEFAULT'
	};
}]);