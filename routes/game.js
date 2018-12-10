var express = require('express');
var router = express.Router();

router.get('/:id', (request, response) => {
	if(request.isAuthenticated()){
		const id = request.params.id;

		response.render('game', {id});
	}
});

module.exports = router;