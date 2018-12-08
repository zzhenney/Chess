var socketio = require('socket.io');
var io = null;

//init socket here instead of io = require('socket.io')(http) in server
exports.initialize = function(server){
	io = socketio(server);

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

