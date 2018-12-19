(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//js interface for apis using fetch


const requestData = {
	method: 'GET',
	credentials: 'include',
	headers: {
		'Content-Type':'application/json',
	}
};






const initRequestData = (method, body) => {
	requestData.method = method;
	requestData.body = body;
};


const checkResponseCode = response => {
	if(response.ok){
		return response;
	}
	Promise.reject(new Error("Response not ok"));
};

const request = (url, requestData) => {
	return fetch(url, requestData).then(checkResponseCode);

};


const createGame = () => {
	return request('/api/creatGame', requestData);
};

const joinGame = gameId => {
	return request(`/api/joinGame/${gameId}`);
};


const getGameInfo = gameId => {
	return request(`/api/getGameInfo/${gameId}`)
		.then(response => {
			return response.json()

		})
};


const listGames = () => {
	//console.log("listgames");
	return request('/api/listGames')
	/*
		.then(response => {
			return response.json()
				.then(json => {
					console.log("response " + json.text());
				})


		})
		*/
		.then(response => {
			return response.json()
				
		})
		//.then(text => console.log("response: " + text))
		.catch(err => {
			console.log("ERRROR " + err);
		})
};

const listCurrentGames = () => {
	return request('/api/listCurrentGames')
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log("ERRROR " + err);
		})
}

const leaveGame = gameId => {
	request(`/api/leaveGame/${gameId}`)
}



//set request data
//create a new request
// feed new request to fetch
//check response code


module.exports = {
	createGame,
	joinGame,
	getGameInfo,
	listGames,
	listCurrentGames,
	leaveGame


}
},{}],2:[function(require,module,exports){
//move this file to frontend then import and call functions from public js file

//list games
const api = require('../frontend/api/index.js');
//import chat from '/scripts/api/chat.js';
//const io = require('../../messaging');

//io.on('new game', function(game))
//TO DO: grab game_id


const appendOpenGames = () => {
	api.listGames()
		.then(response => {
			console.log(response[0].game_id);
			//document.getElementById('current-games').innerHTML = `button.btn.btn-success.btn-sm.btn-block#${response[0].game_id} Game ${response[0].game_id}`
			//determines how many open games are shown, scroll bar should be used instead

			response.forEach(function(id){
				var game = document.createElement('a');
				game.innerHTML = "Game " + id.game_id
				game.id = id.game_id
				game.setAttribute('class', "btn btn-success btn-sm btn-block" )
				game.href = `/api/joinGame/${id.game_id}`
				document.getElementById('current-games').appendChild(game)
				//console.log(id.game_id);
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
				game.href = `/game/${id.game_id}`
				document.getElementById('view-games').appendChild(game)
				//console.log(id.game_id);
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

const gameInfo = () => {
	const gameId = document.getElementById('game-id').value
	console.log('GAME ID: ' + gameId)
	api.getGameInfo(gameId)
		.then(response => {
			//console.log("GAME " + response);
		})


}


const generateGameList = () => {
	appendOpenGames();
	appendCurrentGames();
	appendQuitGame();
	//gameInfo();
}


generateGameList();
},{"../frontend/api/index.js":1}]},{},[2]);
