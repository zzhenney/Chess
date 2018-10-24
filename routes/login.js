const express = require('express');
const router = express.Router();
const db = require('../db');
const passport = require('passport');

router.get('/', (request, response) => {
	response.render('login', { title: 'Express' });
});

router.post('/', 
	passport.authenticate('local', { successRedirect: '/',
									 successFlash: "Welcome to Chess",
									 failureRedirect: '/login',
									 failureFlash: "Login Error",
									 session: true })
);

module.exports = router;