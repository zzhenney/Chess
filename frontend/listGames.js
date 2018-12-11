//list games
import api from '../api';
const io = require('../messaging');

//io.on('new game', function(game))

const appendGames = () => {
	api.listGames()
		.then = games => {
			console.log(games);
			document.getElementById('current-games').innerHTML = button.btn.btn-success.btn-sm.btn-block( id=id onclick=action) Game #{games.game_id}
		}

appendGames();