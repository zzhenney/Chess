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

