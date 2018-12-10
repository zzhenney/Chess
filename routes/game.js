var express = require('express');
var router = express.Router();

router.get('/:id', (request, response) => {
	if(req.isAuthenticated()){
		const { id } = request.params;

		response.render('games/index', { id });
	}
});

module.exports = router;