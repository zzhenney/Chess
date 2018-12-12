const db = require('./index');

exports.createGame = userId => {
	console.log("creating game " + userId);
	return db.one("INSERT into games(next_user, white_user) VALUES ($1, $1) RETURNING id", [userId])
		.then(data => {
			console.log("game id: " + data.id);
			return db.none("INSERT INTO game_pieces SELECT $1, $2, default_col, default_row, id FROM pieces WHERE default_row IN (0,1)", [data.id, userId])
				.then(() => {
					return db.one("INSERT into game_users VALUES($1, $2) RETURNING game_id", [data.id, userId])		
						.catch(err =>{
							console.log("14 DB Error: " + err);
						})
				})
				.catch(err =>{
					console.log("10 DB Error: " + err);
				})
			
		})
		.catch(err =>{
			console.log("18 DB Error: " + err);
		})
};

exports.joinGame = (userId, gameId) => {
 return	getGame(gameId)
		.then(data => {
			if (data.length < 2) {
				console.log("data: " + data);
				db.one("INSERT into game_users VALUES($1, $2) RETURNING game_id", [gameId, userId])
				db.none("INSERT INTO game_pieces SELECT $1, $2, default_col, default_row, id FROM pieces WHERE default_row IN (6,7)", [gameId, userId])
					.catch(err =>{
						console.log("10 DB Error: " + err);
					})
			}
			else{
				console.log("game full");
			}
		})
		.catch(err => {
			console.log("42 ERR: " + err);
		})
};

//getGame 
const getGame = gameId => {
	return db.any("SELECT * from game_users WHERE game_id = $1", [gameId]);
};


//const leaveGame
exports.listGames = () => {
	return db.any("SELECT game_id FROM game_users GROUP BY game_id HAVING COUNT(*) = 1")
		.then(data => {
			console.log(data);
			return data;
		})
		.catch(err => {
			console.log("46 Err: " + err);
		})
};

exports.listCurrentGames = userId => {
	return db.any("SELECT game_id FROM game_users WHERE user_id = $1",[userId])
		.then(data => {
			console.log(data);
			return data;
		})
		.catch(err => {
			console.log("46 Err: " + err);
		})
};

exports.getGameInfo = gameId => {
	return db.any("SELECT * FROM game_pieces WHERE game_id = $1", [gameId])
		.then(data => {
				console.log(data);
				return data;
		})
		.catch(err => {
			console.log("65 DB Err: " + err);
		})
};


/*
exports.joinGame = (userId, gameId) => {
	console.log("TRUE: " + openGame(gameId));
	if (openGame(gameId)){
		db.one("INSERT into game_users VALUES($1, $2) RETURNING game_id", [gameId, userId])
			.catch(err =>{
				console.log("DB Error: " + err);
			})
	}
	else if(openGame(gameId) === false){
		console.log("GAME FULL");
	}
}

const openGame = gameId => {
	db.any("SELECT * from game_users WHERE game_id = $1", [gameId])
		.then(data => {
			//console.log(data);
			console.log("Data length < 2: " + (data.length < 2));
			return (data.length < 2);
		})
		.catch(err => {
			console.log("DB Error 47: " + err);
		})
		
}
*/




