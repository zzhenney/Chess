var express = require('express');
var router = express.Router();
const Game = require("../../db/games");

const io = require('../../messaging');


router.get('/createGame', function(req, res, next) {
	if(req.isAuthenticated()){
  		const user = req.session.passport.user;
  		Game.createGame(user)
  			.then(id => {

  				//console.log("created game: " + id.game_id);
  				//io.emit('new game');

  				res.redirect(`/game/${id.game_id}`);
  				//res.redirect("/users");
  				//init chat
  				
  			})
  			.catch(err => {

  				//console.log("API Router Err: " + err);

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

  		//console.log("user: " + user + " game: " + game);

  		Game.joinGame(user, game)
  			.then(() => {
  				//console.log("joining game: " + game);

  				res.redirect(`/game/${game}`);
  				//res.redirect("/users");
  				//init chat
  				
  			})
  			.catch(err => {

  				//console.log("Join Game API Route Err: " + err);

  				res.redirect("/");
  			})  	
	}
	else{
		res.redirect('/login');

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

  				//console.log("49 Get Game Info API Route Err: " + err);

  				res.redirect("/");
  			})
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/listGames', function(req, res, next) {
	if(req.isAuthenticated()){
  		
  		Game.listGames()
  			.then(games => {
  				//console.log("Open Games: " + games);
  				//res.send(games);
          //console.log("res.json() " + res);
          res.json(games);

  				//init chat
  				
  			})
  			.catch(err => {
  				//console.log("List Game API Route Err: " + err);
  				res.redirect("/");
  			})  	
	}
	else{
		res.redirect('/login');
	}
});

router.get('/listCurrentGames/', function(req, res, next) {
  if(req.isAuthenticated()){
      const user = req.session.passport.user;
      Game.listCurrentGames(user)
        .then(games => {
          //console.log("Open Games: " + games);
          //res.send(games);
          //console.log("res.json() " + res);
          res.json(games);

          //init chat
          
        })
        .catch(err => {
          //console.log("List Game API Route Err: " + err);
          res.redirect("/");
        })    
  }
  else{
    res.redirect('/login');
  }
});

router.get('/leaveGame/:id', function(req, res, next) {
  if(req.isAuthenticated()){
      const user = req.session.passport.user;
      const game = req.params.id;
      Game.leaveGame(game, user)
      res.redirect('/')

        
        .catch(err => {
          console.log("Leave Game API Route Err: " + err);
          //res.redirect("/");
        })    
  }
  else{
    res.redirect('/login');
  }
});



module.exports = router;