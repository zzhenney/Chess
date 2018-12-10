const express = require('express');
const router = express.Router();
const db = require('../db');
const passport = require('passport');

router.get('/', (request, response) => {
  response.render('register', {message: request.flash('message')});
});

/*
router.post('/', (req, res) => {
	console.log(req.body.username);
	db.any('SELECT * FROM users WHERE username = $1', [req.body.username])
		.then((user) => {
			console.log('USER: ', user);
			res.redirect('/');
		})
		.catch((error) => {
			console.log('route error');
			res.redirect('/tests');
		})


});
*/

router.post(
  '/',
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
    session: false
  })
);

module.exports = router;