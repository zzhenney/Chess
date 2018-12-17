const db = require('./index');

exports.getUserScores = gameId => {
	return db.any("SELECT username, wins, losses FROM users")
		.then(data => {
			//console.log(data);
			return data;
		})
		.catch(err => {
			console.log("65 DB Err: " + err);
		})

};