var express = require('express');
var router = express.Router();

router.get('/:id', (request, response) => {
	if(request.isAuthenticated()){
		const id = request.params.id;

		response.render('game', {id});
	}
});

router.get('/api/joinGame/:id', (request, response) => {
	if(request.isAuthenticated()){
		const id = request.params.id;

		response.redirect(`/api/joinGame/${id}`);
	}
});

module.exports = router;