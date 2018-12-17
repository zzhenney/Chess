const express = require('express');
const router = express.Router();
const db = require('../db');
const passport = require('passport');

router.get('/', (request, response) => {
<<<<<<< HEAD

  response.render('login', {message: request.flash('message')});

=======
  response.render('login', {message: request.flash('message')});
>>>>>>> origin/loadingGameState
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
<<<<<<< HEAD

=======
>>>>>>> origin/loadingGameState
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
<<<<<<< HEAD

=======
>>>>>>> origin/loadingGameState
  })
);

module.exports = router;

