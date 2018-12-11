//list games
import api from '/scripts/api/index.js';
//const io = require('../../messaging');

//io.on('new game', function(game))

const appendGames = () => {
	api.listGames()
		.then(response => {
			console.log(response[0].game_id);
			//document.getElementById('current-games').innerHTML = `button.btn.btn-success.btn-sm.btn-block#${response[0].game_id} Game ${response[0].game_id}`
			response.forEach(function(id){
				var game = document.createElement('a');
				game.innerHTML = id.game_id
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

appendGames();