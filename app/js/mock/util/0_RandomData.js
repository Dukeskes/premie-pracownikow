var RandomData = {};

(function() {
	var _names = ["Paul Krzciuk", "Bartłomiej Babros", "Beata P.", "Project Marszałek"];
	var _firstNames = ["Paweł", "Bartłomiej", "Beata", "Marcin", "Oskar", "Piotr", "Bartosz"];
	var _secondNames = ["Bacher", "Nowak", "Nienowak", "Golonka", "Kowalski", "Tusk", "Duda"];
	var _roles = [Role.PM, Role.USER];

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
	RandomData.firstName = function() {
		return _getRandomItem(_firstNames);
	};
	RandomData.secondName = function() {
		return _getRandomItem(_secondNames);
	};
	RandomData.date = function(begin, end) {
		return new Date(Math.random() * (end.getTime() - begin.getTime()) + begin.getTime());
	};
	RandomData.token = function(number) {
		var token = 99999999999999 + number;
		return token.toString(36).replace(/\//g,'_').replace(/\+/g,'-');
	};
	RandomData.role = function() {
		return _getRandomItem(_roles);
	};
		
	function _getRandomItem(storage) {
		return storage[Math.floor(Math.random() * storage.length)];
	}
}());