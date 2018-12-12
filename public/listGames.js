//list games
import api from '/scripts/api/index.js';
//const io = require('../../messaging');

//io.on('new game', function(game))

const appendOpenGames = () => {
	api.listGames()
		.then(response => {
			console.log(response[0].game_id);
			//document.getElementById('current-games').innerHTML = `button.btn.btn-success.btn-sm.btn-block#${response[0].game_id} Game ${response[0].game_id}`
			//determines how many open games are shown, scroll bar should be used instead
			response = response.slice(0, 5);
			response.forEach(function(id){
				var game = document.createElement('a');
				game.innerHTML = "Game " + id.game_id
				game.id = id.game_id
				game.setAttribute('class', "btn btn-success btn-sm btn-block" )
				game.href = `api/joinGame/${id.game_id}`
				document.getElementById('current-games').appendChild(game)
				console.log(id.game_id);
			})

			/*
			document.querySelector('current-games').innerHTML = response
			.map(game => `button.btn.btn-success.btn-sm.btn-block#${game.game_id} Game ${game.game_id}`)
			*/
		})
}

const appendCurrentGames = () => {
	api.listCurrentGames()
		.then(response => {
			response = response.slice(0, 5);
			response.forEach(function(id){
				var game = document.createElement('a');
				game.innerHTML = "Game " + id.game_id
				game.id = id.game_id
				game.setAttribute('class', "btn btn-warning btn-sm btn-block" )
				game.href = `game/${id.game_id}`
				document.getElementById('view-games').appendChild(game)
				console.log(id.game_id);
			})
		})
}

const appendQuitGame = () => {
	var element = document.createElement('a');
	const gameId = document.getElementById('game-id').value

	element.innerHTML = "Quit Game"
	element.setAttribute('class', "btn btn-danger btn-sm btn-block" )
	//element.addEventListener("click", quitGame(gameId))
	element.href = `/api/leaveGame/${gameId}`
	document.getElementById('quitGame').appendChild(element)
}


const generateGameList = () => {
	appendOpenGames();
	appendCurrentGames();
	appendQuitGame();
}


generateGameList();