var express = require('express');
var router = express.Router();
var chessgame = require('../chess-game/logic.js')

/* GET users listing. */
router.get('/:gameId', function(req, res, next) {
  let boardState = chessgame.getBoardState(req.param.gameId)
  res.json(boardState)
});

router.post('/move/:gameId/', function(req, res, next) {

  if(chessgame.isPlayersTurn(req.body.playerId)){

  }else{
    
  }
  res.send("Hi")
});

module.exports = router;
