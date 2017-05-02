describe('Optional', function() {
	it('should be undefined', function() {
		var values = [undefined, null];
		for(var i in values) {
			var value = values[i];
			expect(Optional.isUndefined(value)).toBeTruthy();
			expect(Optional.isDefined(value)).toBeFalsy();
		}
	});

	it('should be defined', function() {
		var values = [
			0, 1,
			'', 'test',
			[], [1],
			false, true
		];
		for(var i in values) {
			var value = values[i];
			expect(Optional.isUndefined(value)).toBeFalsy();
			expect(Optional.isDefined(value)).toBeTruthy();
		}
	});

	it('should return proper value', function() {
		expect(Optional.get(null, 1)).toBe(1);
		expect(Optional.get(0, 1)).toBe(0);
	});

	it('should properly call function', function() {
		var foo = new Foo('bar');
		expect(foo.bar).toBe('bar');
		expect(foo.getHiddenBar()).toBe('bar');

		Optional.call(foo.setBar, ['undefinedFoo']);
		expect(foo.bar).toBe('bar');
		expect(foo.getHiddenBar()).toBe('undefinedFoo');

		Optional.call(foo.setBar, ['definedFoo'], foo);
		expect(foo.bar).toBe('definedFoo');
		expect(foo.getHiddenBar()).toBe('definedFoo');
	});

	var Foo = function(value) {
		var _hiddenBar = value;
		this.bar = value;

		this.setBar = function(value) {
			this.bar = _hiddenBar = value;
		};

		this.getHiddenBar = function() {
			return _hiddenBar;
		};
	}
});