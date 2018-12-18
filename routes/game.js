var express = require('express');
var router = express.Router();
var chessgame = require('../chess-game/logic.js')
var models = require('../models');
var games = models.games
var users = models.users
const db = require('../db');
const board = require('../chess-game/board')

router.get('/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;

    response.render('game', { id });
  }

});
router.get('/getpieces/:id', function (req, res, next) {
  db.any('select * from  game_pieces left join pieces on game_pieces."piece_id" = pieces."id" where game_pieces."gameId" = $1', req.params.id
  ).then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved list of all games'
      });
  }).catch(function (err) {
    console.log(err)
  })
});

router.post('/makemove', function (req, res, next) {
  console.log("Making move")
  let message = "";
  const userid = req.session.passport.user
  console.log(req.body.fromcol , req.body.fromrow , req.body.tocol , req.body.torow , req.body.gameid)
  if (true  ||req.body.fromcol && req.body.fromrow && req.body.tocol && req.body.torow && req.body.gameid) {
    const gameid = req.body.gameid
    const fromcol = req.body.fromcol
    const fromrow = req.body.fromrow
    const tocol = req.body.tocol
    const torow = req.body.torow

    console.log("Game id" , gameid)
    let success = board.movePiece(gameid, fromcol, fromrow, tocol, torow, userid)
      .then(function (success) {;
        res.status(200)
          .json({
            status: 'success',
            successfull: success,
            message: message
          });
      }).catch(function (err) {
        console.log(err)
      })
  }else{
    message = "Did not recive the nessesary parameters"
    res.status(500)
          .json({
            status: 'Failure',
            legalmoves: req.params,
            message: message
          });
  }

});


router.post('/moves', function (req, res, next) {
  let message = "";
   
  if (req.body.col && req.body.row && req.body.gameid) {
    let legalMoves = board.getAllPossibleForPiece(1, 1, 2)
      .then(function (legalMoves) {
        let message = (legalMoves) ? "Retreaved all legal move for selected piece" : "Could not retreve legal moves";
        res.status(200)
          .json({
            status: 'success',
            legalmoves: legalMoves,
            message: message
          });
      }).catch(function (err) {
        console.log(err)
      })
  }else{
    message = "Did not recive the nessesary parameters"
    console.log(message)
    res.status(500)
          .json({
            status: 'Failure',
            legalmoves: req.params,
            message: message
          });
  }

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
