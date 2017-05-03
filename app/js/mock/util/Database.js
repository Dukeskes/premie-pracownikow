/**
 * Created by klekot on 12.02.16.
 */
var Database = {};
Database.users = [
	new User(1, 'klekot', '123'),
	new User(2, 'admin', '123'),
	new User(3, 'test', '123')
];

Database.workers = [];

(function _initWorkers() {
	for (var i = 1; i < RandomData.int(5, 50); i++) {
		Database.workers.push(
			new Worker(
				i,
				RandomData.firstName(),
				RandomData.secondName(),
				RandomData.date(new Date(1990, 1, 1), new Date(2000, 1, 1)).toLocaleDateString(),
				RandomData.double(140, 180),
				RandomData.int(12, 100),
				RandomData.int(0, 100),
				RandomData.int(0, 100),
				RandomData.int(0, 14),
				RandomData.int(0, 14),
				RandomData.int(0, 100),
				RandomData.int(0, 100),
				RandomData.int(0, 100)
			)
		);
	}
})();