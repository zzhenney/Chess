var socketio = require('socket.io');
var session = require('../config/session');
var io = require('socket.io')();

//init socket here instead of io = require('socket.io')(http) in server
exports.initialize = function(server){
	
	io.use(({request}, next) => {
		session(request, request.res, next);
		console.log("Session ID: " + request.sessionID);
		
	});

	io.attach(server);

	

	io.on('connection', function(socket) {

		console.log('!!!! USER CONNECTEDDDDDD !!!!!');

		// default username
		socket.username = "Anonymous";

		// listen on change_username
		socket.on('change_username', (data) => {
			socket.username = data.username
		});

		// listen on new_message
		socket.on('new_message', (data) => {
			// broadcast the new message
			io.sockets.emit('new_message', {message: data.message, username: socket.username});
		})
		socket.on('chat message', function(msg){
			console.log('message: ' + msg);
			io.emit('chat message', msg);
		});

		socket.on('disconnect', function() {
			console.log('a user disconnected');
		});

		
	});
};

exports.io = function(){
	return io;
}

