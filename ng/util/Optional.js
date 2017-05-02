var Optional = {};
Optional.get = function(value, defaultValue) {
	return (Optional.isDefined(value) && value !== null) ? value : defaultValue;
};
Optional.isDefined = function(value) {
	return !(value === null || typeof value === 'undefined');
};
Optional.isUndefined = function(value) {
	return (value === null || typeof value === 'undefined');
};