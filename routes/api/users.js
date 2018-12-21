const express = require('express');

const router = express.Router();
const Users = require('../../db/users');

router.get('/scoreboard', (_, response) => {
  Users.getUserScores()
    .then(scores => {
      response.send(scores);
    })
    .catch(() => {
      response.status(500).end();
    });
});

module.exports = router;
