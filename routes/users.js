var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		res.send('Only visible if logged in');
		
	}
	else{
		res.redirect('/login');
	}
  
});

module.exports = router;
