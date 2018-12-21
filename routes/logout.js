const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  request.logout();
  request.app.locals.loggedin = false; //move to tools/helpers

  response.redirect('/login');
});


module.exports = router;
