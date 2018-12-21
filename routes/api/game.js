const express = require('express');

const router = express.Router();
const Game = require('../../db/games');

router.get('/createGame', (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req.session.passport;
    Game.createGame(user)
      .then(id => {
        res.redirect(`/game/${id.game_id}`);
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/joinGame/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req.session.passport;
    const game = req.params.id;

    Game.joinGame(user, game)
      .then(() => {
        res.redirect(`/game/${game}`);
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/getGameInfo/:id', (req, res) => {
  const game = req.params.id;
  if (req.isAuthenticated()) {
    Game.getGameInfo(game)
      .then(data => {
        res.send(data);
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/');
  }
});

router.get('/listGames', (req, res) => {
  if (req.isAuthenticated()) {
    Game.listGames()
      .then(games => {
        res.json(games);
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/listCurrentGames/', (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req.session.passport;

    Game.listCurrentGames(user)
      .then(games => {
        res.json(games);
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/leaveGame/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req.session.passport;
    const game = req.params.id;
    Game.leaveGame(game, user);
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
