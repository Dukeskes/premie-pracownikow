var User = Class.extend({
	init: function(id, username, password, role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}
});