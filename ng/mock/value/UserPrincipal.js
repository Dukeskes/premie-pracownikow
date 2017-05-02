var UserPrincipal = function(id, role, token) {
	this.id = id;
	this.role = role;
	this.token = token;
};

UserPrincipal.roleValues = function() {
	var result = [];
	for(var i in Role) {
		var role = Role[i];
		if(role !== Role.ANONYMOUS) {
			result.push(Role[i]);
		}
	}
	return result;
};