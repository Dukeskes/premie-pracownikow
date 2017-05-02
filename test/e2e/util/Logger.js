var Logger = function() {
	var _isEnabled = true;

	this.storyStart = function(name) {
		_log(
			'===================================================',
			'Starting story: ' + name,
			'==================================================='
		);
	};

	this.caseStart = function(name) {
		_log('\n* ' + name + ' *');
	};

	this.step = function(pageName, actionDesc) {
		_log(pageName + ': ' + actionDesc);
	};

	function _log() {
		if(_isEnabled) {
			for(var i = 0; i < arguments.length; ++i) {
				console.log(arguments[i]);
			}
		}
	}
};

module.exports = new Logger();