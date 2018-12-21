const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  request.logout();
  request.app.locals.loggedin = false;

  response.redirect('/login');
});

module.exports = router;
