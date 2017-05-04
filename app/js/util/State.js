var State = {};

State.Token = {};
State.Token.LOGIN = 'login';
State.Token.REGISTRATION = 'registration';
State.Token.APP = 'app';
State.Token.DASHBOARD = State.Token.APP + '.dashboard';
State.Token.DIALOG = State.Token.APP + '.dialog';
State.Token.SPINNER = State.Token.APP + '.spinner';
State.Token.WORKERS = State.Token.APP + '.workers';
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
		_createItem(_parent, 'STATE.DIALOG', State.Token.DIALOG),
		_createItem(_parent, 'STATE.SPINNER', State.Token.SPINNER),
		_createItem(_parent, 'STATE.WORKERS', State.Token.WORKERS, null, ['count', 'page', 'filters', 'orders']),
		_createErrorItem('STATE.ERROR', State.Token.ERROR)
	].forEach(function(item) {
			_tokenItemMap[item.getToken()] = item;
		});

	function _createAbstractItem(parent, name, token, pathParam, queryParams) {
		return _createItem(parent, name, token, pathParam, queryParams, 'vm', true);
	}

	function _createItem(parent, name, token, pathParam, queryParams, controllerAs, isAbstract) {
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

		var parentUrl;
		if(parent) {
			queryParams = _resolveQueryParams(parent.getUrl(), queryParams);
			parentUrl = _urlWithoutQueryParams(parent.getUrl());
		} else {
			parentUrl = null;
		}

		var url = ((parentUrl) ? (parentUrl + '/' + tokenLastPart) : ('^' + path)) + paramPart;
		if(queryParams) {
			url += '?' + queryParams.join('&');
		}

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

	function _resolveQueryParams(url, queryParams) {
		var questionMarkIndex = url.indexOf('?');
		if(questionMarkIndex !== -1) {
			var urlQueryParams = url.substring(questionMarkIndex + 1).split('&');
			return (queryParams) ? urlQueryParams.concat(queryParams) : urlQueryParams;
		} else {
			return queryParams;
		}
	}

	function _urlWithoutQueryParams(url) {
		var questionMarkIndex = url.indexOf('?');
		return (questionMarkIndex !== -1) ? url.substring(0, questionMarkIndex) : url;
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


