var express = require('express');
var router = express.Router();
const Game = require("../db/games");
//const passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
		res.render('index', { title: 'Express' });
	
	}
	else{
		res.redirect('/login');
	}
});



module.exports = router;
