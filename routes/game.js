var express = require('express');
var router = express.Router();
var chessgame = require('../chess-game/logic.js')
var models = require('../models');
var games = models.games
var users = models.users
const db = require('../db');

router.get('/all/', function (req, res, next) {
  db.any('select * from games').then(function (data) {
    console.log(data)
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved list of all games'
      });
  })
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

module.exports = router;
