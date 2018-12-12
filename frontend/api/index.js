//js interface for apis using fetch


const requestData = {
	method: 'GET',
	credentials: 'include',
	headers: {
		'Content-Type':'application/json',
	}
}






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
		.then = response => {
			response.json();
		}
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
				.then(text => {
					console.log("response: " + text)
					return text;
				})
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




//set request data
//create a new request
// feed new request to fetch
//check response code



export default {
	createGame,
	joinGame,
	getGameInfo,
	listGames,
	listCurrentGames



}