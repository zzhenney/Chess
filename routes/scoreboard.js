const express = require('express');

const router = express.Router();

router.get('/', (_, response) => {
  response.render('scoreboard');
});

module.exports = router;
