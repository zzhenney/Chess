var express = require('express');
var router = express.Router();
const createGame = require("../db/games");
//const passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
  		const user = req.session.passport.user
  		console.log("request: " + req.session.passport);
  		console.log("user id: " + user);
  		createGame(user);
		res.render('index', { title: 'Express' });

		
	}
	else{
		res.redirect('/login');
	}
});



module.exports = router;
