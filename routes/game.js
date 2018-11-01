var express = require('express');
var router = express.Router();
var helpers = require('../gameLogic/helpers')

/* GET users listing. */
router.get('/get-game-state/:gameId', function(req, res, next) {
  res.send(helpers.convert1D(req.params.gameId, req.params.gameId));
});

module.exports = router;
