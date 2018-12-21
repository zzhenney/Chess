const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('index', { id: 0 });
  }
  else {
    res.redirect('/login');
  }
});



module.exports = router;
