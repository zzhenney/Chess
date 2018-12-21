const express = require('express');

const router = express.Router();

const isAuthenticated = require('../../auth/isAuthenticated');
const User = require('../../db/');
const { io } = require('../../messaging');

router.post('/:gameId', isAuthenticated, (request, response) => {
  const { user } = request.session.passport;
  const { gameId } = request.params;
  const message = request.body;

  User.one('SELECT username from users WHERE id = $1', [user])
    .then(username => {
      try {
        io.emit(`chat_${gameId}`, {
          username: { username: Object.values(username) },
          message
        });
      } catch (error) {
        console.log(`emit issue: ${error}`);
      }

      response.sendStatus(204);
    })
    .catch(error => {
      console.log(`Route Err: ${error}`);
    });
});

module.exports = router;
