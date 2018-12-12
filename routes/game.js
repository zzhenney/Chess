var express = require('express');
var router = express.Router();
var chessgame = require('../chess-game/logic.js')
var models = require('../models');
var games = models.games
var users = models.users
const db = require('../db');

router.get('/:id', (request, response) => {
	if(request.isAuthenticated()){
		const id = request.params.id;

		response.render('game', {id});
	}

});
router.get('/getpieces/:id', function (req, res, next) {
  console.log(req.param.gameId)
  console.log(req.param.gameId)
  db.any('select * from  game_pieces left join pieces on game_pieces."pieceId" = pieces."id" where game_pieces."gameId" = $1', req.param.id
  ).then(function (data) {
    console.log(data)
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved list of all games'
      });
  }).catch(function(err){
    console.log(err)
  })
});

/* GET users listing. */
router.get('/:gameid', function (req, res, next) {
  console.log('H')
  let boardState = chessgame.getBoardState(req.param.gameid)
  res.json(boardState)
});



router.post('/move/:gameId/', function (req, res, next) {

  if (chessgame.isPlayersTurn(req.body.playerId)) {

  } else {

  }
  res.send("Hi")
});

/*
router.get('/api/joinGame/:id', (request, response) => {
	if(request.isAuthenticated()){
		const id = request.params.id;

		response.redirect(`/api/joinGame/${id}`);
	}
});

router.get('/api/createGame', (request, response) => {
	if(request.isAuthenticated()){
		//const id = request.params.id;

		response.redirect('/api/createGame');
	}

});
*/

module.exports = router;
