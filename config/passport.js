const LocalStrategy = require('passport-local').Strategy;
//const User = require('../models/users');
const passport = require('passport');
const db = require('../db');

passport.use(
  new LocalStrategy(function(username, password, done) {
    db.any('SELECT * FROM users WHERE username = $1', [username])
      .then(user => {
        console.log('USER: ', user, `Pass: [${password}]`);

        if (user.length === 0) {
          console.log('User not found');
          return done(null, false);
        }
        if (user[0].password !== password) {
          console.log('Bad password');
          return done(null, false);
        }
        return done(null, user[0]);
      })
      .catch(error => {
        return done(error);
      });
  })
);

/*
passport.use(new LocalStrategy(function(username, password, done) => {
	db.any('SELECT * FROM users WHERE username = $1', [username])
		.then((user) => {

			console.log('USER: ', user);

			if(!user) return done(null, false);
			//add bcrypt here
			if(password == user.password){
				return done(null,user);
			} else {
				return done(null,false);
			}
		});
		.catch((error) => {
			console.log('ERROR PASSPORT');
			return done(error);
		});
}));
*/

module.exports = passport;
