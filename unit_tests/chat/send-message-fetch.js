
const expect = require('chai').expect
const chat = require('/../../scripts/api/chat')


//const initDataStub = this.sandbox.stub( 



const result = yield chat.sendMessage(0, "hello");
expect(result).to.eql("hello");

/*
const requestData = {
	method: 'GET',
	credentials: 'include',
	headers: {
		'Content-Type':'application/json'
	}
}

const initRequestData = (method, body) => {
	requestData.method = method;
	requestData.body = JSON.stringify({body: body});
};


const checkResponseCode = response => {
	if(response.ok){	
		return response;
	}			
	Promise.reject(new Error("Response not ok"));
};

const request = (url, requestData) => {
	console.log("REQUEST: " + requestData.body);
	//console.log("REQUEST: " + requestData.json);
	fetch(url, requestData).then(checkResponseCode);

};

const sendMessage = (gameId, message) => {
	console.log(`message: ${message}`);
	console.log("PRE: " + requestData.body);
	initRequestData('post', message);
	console.log("POST INIT: " +requestData);
	request(`/api/chat/${gameId}`, requestData);

	

};

module.exports = {sendMessage};
*/