var State = {};

State.Token = {};
State.Token.LOGIN = 'login';
State.Token.REGISTRATION = 'registration';
State.Token.APP = 'app';
	State.Token.DASHBOARD = State.Token.APP + '.dashboard';
    State.Token.USER_EDIT = State.Token.APP + '.userEdit';
	State.Token.ERROR = State.Token.APP + '.error';

State.Item = function(abstract, token, name, url, controller, controllerAs, template) {
	this.isAbstract = function() {
		return abstract;
	};
	this.getToken = function() {
		return token;
	};
	this.getName = function() {
		return name;
	};
	this.getUrl = function() {
		return url;
	};
	this.getController = function() {
		return controller;
	};
	this.getControllerAs = function() {
		return controllerAs;
	};
	this.getTemplate = function() {
		return template;
	};
};

(function() {
	State.getItem = function(token) {
		return _tokenItemMap[token];
	};

	var CONTROLLER_SUFFIX = 'Controller';
	var TEMPLATE_SUFFIX = 'View.html';

	var TEMPLATE_ROOT = 'template';

	var _tokenItemMap = {};
	var _parent = null;
	[
		_createItem(_parent, 'STATE.LOGIN', State.Token.LOGIN),
        _createItem(_parent, 'STATE.REGISTRATION', State.Token.REGISTRATION),
		_createAbstractItem(_parent, 'STATE.APP', State.Token.APP)
	].forEach(function(item) {
			_tokenItemMap[item.getToken()] = item;
		});

	_parent = State.getItem(State.Token.APP);
	[
		_createItem(_parent, 'STATE.DASHBOARD', State.Token.DASHBOARD),
        _createItem(_parent, 'STATE.USER_EDIT', State.Token.USER_EDIT),
		_createErrorItem('STATE.ERROR', State.Token.ERROR)
	].forEach(function(item) {
			_tokenItemMap[item.getToken()] = item;
		});

	function _createAbstractItem(parent, name, token, pathParam) {
		return _createItem(parent, name, token, pathParam, 'vm', true);
	}

	function _createItem(parent, name, token, pathParam, controllerAs, isAbstract) {
		controllerAs = Optional.get(controllerAs, 'vm');
		isAbstract = Optional.get(isAbstract, false);

		var absoluteTokenLastPart = _getLastPart(token);
		var parentTokenLastPart = (parent) ? _getLastPart(parent.getToken()) : '';
		var tokenLastPart;
		if(parentTokenLastPart && absoluteTokenLastPart.indexOf(parentTokenLastPart) === 0) {
			tokenLastPart = absoluteTokenLastPart[parentTokenLastPart.length].toLowerCase() + absoluteTokenLastPart.substr(parentTokenLastPart.length + 1);
		} else {
			tokenLastPart = absoluteTokenLastPart;
		}
		var path = _toPath(token, tokenLastPart);
		var paramPart = (pathParam) ? ('/:' + pathParam) : '';
		var url = ((parent) ? (parent.getUrl() + '/' + tokenLastPart) : ('^' + path)) + paramPart;

		return new State.Item(
			isAbstract,
			token,
			name,
			url,
			absoluteTokenLastPart + CONTROLLER_SUFFIX,
			controllerAs,
			TEMPLATE_ROOT + path + '/' + tokenLastPart + TEMPLATE_SUFFIX
		);
	}

	function _createErrorItem(name, token) {
		var tokenLastPart = _getLastPart(token);
		var path = _toPath(token, tokenLastPart);

		return new State.Item(
			false,
			token,
			name,
			'*path',
			tokenLastPart + CONTROLLER_SUFFIX,
			'vm',
			TEMPLATE_ROOT + path + '/' + tokenLastPart + TEMPLATE_SUFFIX
		);
	}

	function _getLastPart(token) {
		return token.substr(token.lastIndexOf('.') + 1);
	}

	function _toPath(token, tokenLastPart) {
		var lastPartIndex = token.lastIndexOf('.');
		if(lastPartIndex !== -1) {
			token = token.substr(0, lastPartIndex + 1) + tokenLastPart;
		}
		return '/' + token.replace(/\./g, '/');
	}
})();


