const express = require('express');
const router = express.Router();
const db = require('../db');
const passport = require('passport');

router.get('/', (request, response) => {
	response.render('login', { title: 'Express' });
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

	
router.post('/', (req, res, next) => {
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', session: false})
});


module.exports = router;