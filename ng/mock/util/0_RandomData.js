var RandomData = {};

(function() {
	var _names = ["Paul Krzciuk", "Bartłomiej Babros", "Beata P.", "Project Marszałek"];

	RandomData.name = function() {
		return _getRandomItem(_names);
	};

	RandomData.int = function(begin, end) {
		return Math.floor(Math.random() * (end - begin + 1)) + begin;
	};
	RandomData.double = function(begin, end) {
		return Math.random() * (end - begin) + begin;
	};
	RandomData.bool = function() {
		return (Math.random() > 0.5);
	};

	function _getRandomItem(storage) {
		return storage[Math.floor(Math.random() * storage.length)];
	}
}());