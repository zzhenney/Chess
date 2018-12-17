var express = require('express');
var router = express.Router();
const Game = require("../db/games");
//const passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
<<<<<<< HEAD
		res.render('index', {id: 0 });
=======
		res.render('index', { title: 'Chess' });
>>>>>>> origin/loadingGameState
	
	}
	else{
		res.redirect('/login');
	}
});



module.exports = router;
