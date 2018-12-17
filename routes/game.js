var express = require('express');
var router = express.Router();
<<<<<<< HEAD

=======
var chessgame = require('../chess-game/logic.js')
var models = require('../models');
var games = models.games
var users = models.users
const db = require('../db');
const board = require('../chess-game/board')
>>>>>>> origin/loadingGameState

router.get('/:id', (request, response) => {
	if(request.isAuthenticated()){
		const id = request.params.id;

		response.render('game', {id});
	}

});
router.get('/getpieces/:id', function (req, res, next) {
  db.any('select * from  game_pieces left join pieces on game_pieces."pieceId" = pieces."id" where game_pieces."gameId" = $1', req.params.id
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

router.get('/moves/1', function (req, res, next) {
  let legalMoves = board.getAllPossibleForPiece(1, 1,2)
  .then(function (legalMoves) {
    let message = (legalMoves)? "Retreaved all legal move for selected piece" : "Could not retreve legal moves";
    res.status(200)
      .json({
        status: 'success',
        legalmoves: legalMoves,
        message: message
      });
  }).catch(function(err){
    console.log(err)
  })
});


/* GET users listing. */
router.get('/:gameid', function (req, res, next) {
  let boardState = chessgame.getBoardState(req.param.gameid)
  res.json(boardState)
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
<<<<<<< HEAD

=======
>>>>>>> origin/loadingGameState
