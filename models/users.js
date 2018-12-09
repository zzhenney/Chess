var db = require('../db/index');

var User = function(data){
	this.data = data;
};

User.find = function(username) {
	db.any("SELECT * FROM users WHERE username=$1",[username], function(err,rows){
		if(err) return done(err);
		done(null,rows);
	});
};


module.exports = User;
