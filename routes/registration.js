var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (request, response) => {
  response.render('registration', {message: request.flash('message')});
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
    failureRedirect: '/registration',
    failureFlash: true,
    session: false
  })
);

module.exports = router;