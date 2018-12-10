const db = require('./index');

const createGame = userId => {
	console.log("creating game " + userId);
	db.one("INSERT into games DEFAULT VALUES RETURNING id")
		.then(data => {
			console.log("game id: " + data.id);
			db.one("INSERT into game_users VALUES($1, $2) RETURNING game_id", [data.id, userId])
				.catch(err =>{
					console.log("DB Error: " + err);
				})
		})
		.catch(err =>{
			console.log("DB Error: " + err);
		})
};

module.exports = createGame;