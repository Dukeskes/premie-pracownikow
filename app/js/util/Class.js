var Class = function() {
};
Class.prototype.init = function() {
};
Class.extend = function(def) {
	var classDef = function() {
		if(arguments[0] !== Class) {
			this.init.apply(this, arguments);
		}
	};

	var proto = new this(Class);
	var superClass = this.prototype;
	for(var i in def) {
		var item = def[i];
		if(item instanceof Function) {
			item.$ = superClass;
		}
		proto[i] = item;
	}

	classDef.prototype = proto;
	classDef.extend = this.extend;

	return classDef;
};
Class.copy = function(obj) {
	return angular.copy(obj);
};
