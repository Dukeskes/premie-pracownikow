var DataUtil = {};
DataUtil.fetchTableData = function(storage, offset, limit) {
	var endIndex = (limit === 0) ? storage.length : offset + limit;

	return {
		entries: storage.slice(offset, endIndex),
		numberOfAll: storage.length
	};
};
