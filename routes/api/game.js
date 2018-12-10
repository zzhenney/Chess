var express = require('express');
var router = express.Router();
const Game = require("../../db/games");

router.get('/createGame', function(req, res, next) {
	if(req.isAuthenticated()){
  		const user = req.session.passport.user
  		Game.createGame(user)
  			.then(gameId => {
  				console.log("created game: " + gameId);
  				res.redirect(`/game/${gameId}`);
  				//res.redirect("/users");
  				//init chat
  				
  			})
  			.catch(err => {
  				console.log("API Router Err: " + err);
  				res.redirect("/");
  			})	
	}
	else{
		res.redirect('/login');
	}
});

router.get('/joinGame', function(req, res, next) {
	if(req.isAuthenticated()){
  		const user = req.session.passport.user
  		const game = req.session.passport.params
  		Game.joinGame(user, game)
  			.then(() => {
  				console.log("joining game: " + game);
  				res.redirect(`/game/${gameId}`);
  				//res.redirect("/users");
  				//init chat
  				
  			})
  			.catch(err => {
  				console.log("Join Game API Route Err: " + err);
  				res.redirect("/");
  			})	
	}
	else{
		res.redirect('/login');
	}
});

module.exports = router;