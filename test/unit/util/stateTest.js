describe('State', function() {
	it('should has item for each token', function() {
		for(var token in State.Token) {
			expect(State.getItem(State.Token[token])).toBeDefined();
		}
	});
});