const express = require('express');

const router = express.Router();

const isAuthenticated = require('../auth/isAuthenticated');

router.get('/', isAuthenticated, (_, response) => {
  response.render('index', { id: 0 });
});

module.exports = router;
