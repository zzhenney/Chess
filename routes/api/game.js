const express = require('express');

const router = express.Router();

const isAuthenticated = require('../../auth/isAuthenticated');
const Game = require('../../db/games');

router.get('/createGame', isAuthenticated, (request, response) => {
  const { user } = request.session.passport;

  Game.createGame(user)
    .then(id => {
      response.redirect(`/game/${id.game_id}`);
    })
    .catch(() => {
      response.redirect('/');
    });
});

router.get('/joinGame/:id', isAuthenticated, (request, response) => {
  const { user } = request.session.passport;
  const game = request.params.id;

  Game.joinGame(user, game)
    .then(() => {
      response.redirect(`/game/${game}`);
    })
    .catch(() => {
      response.redirect('/');
    });
});

router.get('/getGameInfo/:id', isAuthenticated, (request, response) => {
  const game = request.params.id;

  Game.getGameInfo(game)
    .then(data => {
      response.send(data);
    })
    .catch(() => {
      response.redirect('/');
    });
});

router.get('/listGames', isAuthenticated, (request, response) => {
  Game.listGames()
    .then(games => {
      response.json(games);
    })
    .catch(() => {
      response.redirect('/');
    });
});

router.get('/listCurrentGames/', isAuthenticated, (request, response) => {
  const { user } = request.session.passport;

  Game.listCurrentGames(user)
    .then(games => {
      response.json(games);
    })
    .catch(() => {
      response.redirect('/');
    });
});

router.get('/leaveGame/:id', isAuthenticated, (request, response) => {
  const { user } = request.session.passport;
  const game = request.params.id;
  Game.leaveGame(game, user);
  response.redirect('/');
});

module.exports = router;
