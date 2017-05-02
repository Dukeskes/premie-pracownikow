angular.module(APP_ID).service('breadcrumbsBuilder', [function() {
	this.init = function() {
		this.iconPath = null;
		this.items = [];
		this.buttons = [];
		return this;
	};

	this.setIconPath = function(path) {
		this.iconPath = path;
		return this;
	};
	this.addItem = function(stateToken, caption) {
		var item = State.getItem(stateToken);
		if(Optional.isDefined(caption)) {
			item = new State.Item(item.isAbstract(), item.getToken(), caption, item.getUrl(), item.getController(), item.getTemplate());
		}
		this.items.push(item);
		return this;
	};
	this.addButton = function(caption, clickFunction) {
		this.buttons.push(new TextButton(caption, clickFunction));
		return this;
	};
	this.addIconButton = function(icon, tooltip, clickFunction) {
		this.buttons.push(new IconButton(icon, tooltip, clickFunction));
		return this;
	};

	var Button = Class.extend({
		init: function(type, clickFunction) {
			this.type = type;
			this.clickFunction = clickFunction;
		}
	});
	var TextButton = Button.extend({
		init: function(caption, clickFunction) {
			arguments.callee.$.init.call(this, 'text', clickFunction);
			this.caption = caption;
		}
	});
	var IconButton = Button.extend({
		init: function(icon, tooltip, clickFunction) {
			arguments.callee.$.init.call(this, 'icon', clickFunction);
			this.icon = icon;
			this.tooltip = tooltip;
		}
	});
}]);