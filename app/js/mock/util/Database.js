/**
 * Created by klekot on 12.02.16.
 */
var Database = {};
Database.users = [
	new User(1, 'admin', '123', Role.ADMIN),
	new User(2, 'pm', '123', Role.PM),
	new User(3, 'user', '123', Role.USER)
];

Database.workers = [];

(function _initWorkers() {
	for (var i = 1; i < RandomData.int(5, 50); i++) {
		Database.workers.push(
			new Worker(
				i,
				RandomData.token(i),
				RandomData.firstName(),
				RandomData.secondName(),
				RandomData.date(new Date(1990, 1, 1), new Date(2000, 1, 1)).toLocaleDateString(),
				RandomData.role(),
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

Database.reviews = [];
(function _initReviews() {
	var step = 0;
	for (var i = 1; i < Database.workers.length; i++) {
		for (var j = 1; j < Database.workers.length; j++) {
			if(i !== j) {
				step++;
				Database.reviews.push(
					new Review(
						step,
						RandomData.date(new Date(1990, 1, 1), new Date(2000, 1, 1)).toLocaleDateString(),
						Database.workers[j],
						Database.workers[i].id,
						Database.workers[i].role,
						RandomData.int(0, 100),
						RandomData.int(0, 100),
						RandomData.int(0, 100)
					)
				);
			}
		}
	}
})();
