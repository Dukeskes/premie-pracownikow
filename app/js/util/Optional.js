var Optional = {};
Optional.get = function(value, defaultValue) {
	return (Optional.isDefined(value) && value !== null) ? value : defaultValue;
};
Optional.call = function(callable, args, self) {
	if(Optional.isDefined(callable)) {
		callable.apply(self, args);
	}
};
Optional.isDefined = function(value) {
	return !(value === null || typeof value === 'undefined');
};
Optional.isUndefined = function(value) {
	return (value === null || typeof value === 'undefined');
};