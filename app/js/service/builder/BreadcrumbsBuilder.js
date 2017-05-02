angular.module(APP_ID).service('breadcrumbsBuilder', [function() {
	this.init = function() {
		this.items = [];
		return this;
	};

	this.addItem = function(stateToken, caption) {
		var item = Class.copy(State.getItem(stateToken));
		if(Optional.isDefined(caption)) {
			item = new State.Item(item.isAbstract(), item.getToken(), caption, item.getUrl(), item.getController(), item.getTemplate());
		}
		this.items.push(item);
		return this;
	};
}]);