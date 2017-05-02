angular.module(APP_ID).service('spinner', [function() {
	var GLOBAL_OBSERVER_KEY = 'UNIQUE_SPINNER_GLOBAL_OBSERVER_!';

	var _keyValueMap = {};
	var _keyObserverMap = {};

    this.observe = function(key, changeCallback) {
		key = (key) ? key : GLOBAL_OBSERVER_KEY;
        _keyObserverMap[key] = changeCallback;
		if(_keyValueMap[key]) {
			changeCallback(true);
		}
	};

	this.start = function(key) {
		_changeValue(((key) ? key : GLOBAL_OBSERVER_KEY), true);
	};
	this.stop = function(key) {
		_changeValue(((key) ? key : GLOBAL_OBSERVER_KEY), false);
	};

	function _changeValue(key, value) {
		if(_keyValueMap[key] !== value) {
			_keyValueMap[key] = value;
			var observer = _keyObserverMap[key];
			if(observer) {
				observer(value);
			}
		}
	}
}]);