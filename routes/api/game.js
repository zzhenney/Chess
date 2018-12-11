var express = require('express');
var router = express.Router();
const Game = require("../../db/games");

router.get('/createGame', function(req, res, next) {
	if(req.isAuthenticated()){
  		const user = req.session.passport.user;
  		Game.createGame(user)
  			.then(id => {
  				console.log("created game: " + id.game_id);
  				res.redirect(`/game/${id.game_id}`);
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

router.get('/joinGame/:id', function(req, res, next) {
	if(req.isAuthenticated()){
  		const user = req.session.passport.user;
  		const game = req.params.id;
  		console.log("user: " + user + " game: " + game);

  		Game.joinGame(user, game)
  			.then(() => {
  				console.log("joining game: " + game);
  				res.redirect(`/game/${game}`);
  				//res.redirect("/users");
  				//init chat
  				
  			})
  			.catch(err => {
  				console.log("Join Game API Route Err: " + err);
  				res.redirect("/");
  			})  	
	}
	else{
		res.redirect('/');
	}
});

router.get('/getGameInfo/:id', function(req, res, next) {
	const game = req.params.id;
	if(req.isAuthenticated()){
		Game.getGameInfo(game)
  			.then(data => {
  				res.send(data);
  				
  			})
  			.catch(err => {
  				console.log("49 Get Game Info API Route Err: " + err);
  				res.redirect("/");
  			})
	}
	else{
		res.redirect('/');
	}
	
});



module.exports = router;