angular.module(APP_ID).service('tableBuilder', ['$q', '$location', '$state', '$stateParams', 'spinner', 'NgTableParams', function($q, $location, $state, $stateParams, spinner, NgTableParams) {
	this.createTable = function(entriesFetcher) {
		return new Table(entriesFetcher);
	};

	this.queryBuilder = function() {
		return QueryBuilder;
	};

	var Table = function(entriesFetcher) {
		var _config = {
			firstLoad: true,
			spinnerKey: null,
			entryId: 'id'
		};

		var _keyFilterMap = {};
		var _keyOrderMap = {};

		var _params = _resolveParams();
		var _columns = [];
		var _entries = [];
		var _selectedEntryIds = [];

		var _ngTableParams = null;

		this.spinnerKey = function(key) {
			_config.spinnerKey = key;
			return this;
		};
		this.entryId = function(id) {
			_config.entryId = id;
			return this;
		};

		this.createColumn = function(id, name) {
			_columns.push(new Column(id, name));
			return this;
		};

		this.page = function(page) {
			_params.page = page;
			return this;
		};
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
		this.toggleOrder = function(key) {
			var order = _keyOrderMap[key];
			_keyOrderMap = {};
			_keyOrderMap[key] = (order) ?
					((order.type === OrderType.ASC) ? QueryBuilder.desc(key) : QueryBuilder.asc(key)) :
					QueryBuilder.asc(key);

			_columns.forEach(function(column) {
				column.orderType = (column.id === key) ? _keyOrderMap[key].type : null;
			});

			return this;
		};

		this.isRowSelected = function(id) {
			return _selectedEntryIds.indexOf(id) !== -1;
		};
		this.areAllRowsSelected = function() {
			return _entries.length === _selectedEntryIds.length;
		};
		this.selectedRowsCount = function() {
			return _selectedEntryIds.length;
		};
		this.toggleSelect = function(id) {
			var index = _selectedEntryIds.indexOf(id);
			if(index !== -1) {
				_selectedEntryIds.splice(index, 1);
			} else {
				_selectedEntryIds.push(id);
			}
		};
		this.toggleSelectAll = function() {
			if(_entries.length === _selectedEntryIds.length) {
				_selectedEntryIds = [];
			} else {
				_selectedEntryIds = [];
				_entries.forEach(function(entry) {
					_selectedEntryIds.push(entry[_config.entryId]);
				});
			}
		};

		this.getParams = function() {
			return _params;
		};
		this.getColumns = function() {
			return _columns;
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

			if(_config.firstLoad) {
				_config.firstLoad = false;
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
						Optional.call(resolve, [data]);
						_stopSpinner();
					}, function(data) {
						Optional.call(reject, [data]);
						_stopSpinner();
					});
			});
		};

		this.toNgTableParams = function() {
			if(!_ngTableParams) {
				var _this = this;
				_ngTableParams = new NgTableParams(_params, {
					counts: [],
					getData: function(ngParams) {
						_params.page = ngParams.page();
						_params.count = ngParams.count();

						return _this.fetchEntries()
							.then(function(data) {
								_entries = data.entries;
								_selectedEntryIds = [];
								ngParams.total(data.numberOfAll);
								return _entries;
							});
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
			if(Optional.isDefined(_config.spinnerKey)) {
				spinner.start(_config.spinnerKey);
			}
		}
		function _stopSpinner() {
			if(Optional.isDefined(_config.spinnerKey)) {
				spinner.stop(_config.spinnerKey);
			}
		}
	};

	var Column = function(id, name, orderType) {
		this.id = id;
		this.name = name;
		this.orderType = orderType;
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