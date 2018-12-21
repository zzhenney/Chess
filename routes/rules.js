const express = require('express');

const router = express.Router();

router.get('/', (_, response) => {
  response.render('rules');
});

module.exports = router;
