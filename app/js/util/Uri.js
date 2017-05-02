var Uri = {};
Uri.getQueryParams = function(uri) {
	var result = {};
	var questionMarkIndex = uri.indexOf('?');
	if(questionMarkIndex !== -1) {
		var splitParams = uri.substr(questionMarkIndex + 1).split('&');
		for(var i = 0; i < splitParams.length; ++i) {
			var splitParam = splitParams[i].split('=');
			result[splitParam[0]] = (splitParam.length === 1) ? true : splitParam[1];
		}
	}

	return result;

};
Uri.validate = function(uri) {
	var questionMarkIndex = uri.indexOf('?');
	if(questionMarkIndex === -1) {
		return uri;
	}

	var hashIndex = uri.indexOf('#');
	if(questionMarkIndex !== -1 && hashIndex > questionMarkIndex) {
		var params = uri.substr(questionMarkIndex, hashIndex - questionMarkIndex);
		return uri.substr(0, questionMarkIndex) + uri.substr(hashIndex) + params;
	} else {
		return uri;
	}
};