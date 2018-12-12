var express = require('express');
var router = express.Router();
const Game = require("../../db/games");

const io = require('../../messaging');

router.post('/:roomId', function(req, res, next) {
	if(req.isAuthenticated()){
  		const user = req.session.passport.user;
  		const roomId = req.params.id;
  		const message = req.body;
  		
  		io.emit(`chat_${roomId}`, {user, message});

  		response.sendStatus(204);
	}
	else{
		res.redirect('/login');
	}
});

module.exports = router;