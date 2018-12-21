const express = require('express');

const router = express.Router();

const db = require('../db');
const isAuthenticated = require('../auth/isAuthenticated');
const board = require('../chess-game/board');

router.get('/:id', isAuthenticated, (request, response) => {
  const { id } = request.params;

  response.render('game', { id });
});

router.get('/getpieces/:id', (request, response) => {
  const { id } = request.params;

  db.any(
    'select * from  game_pieces left join pieces on game_pieces."piece_id" = pieces."id" where game_pieces."gameId" = $1',
    id
  )
    .then(data => {
      response.json({
        status: 'success',
        data,
        message: 'Retrieved list of all games'
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.post('/makemove', async (request, response) => {
  const { user: userid } = request.session.passport;
  const { fromcol, fromrow, tocol, torow, gameid } = request.body;

  board
    .movePiece(gameid, fromcol, fromrow, tocol, torow, userid)
    .then(successfull => {
      response.json({
        status: 'success',
        successfull
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.post('/moves', (request, response) => {
  const { col, row, gameid } = request.body;

  if (col !== undefined && row !== undefined && gameid !== undefined) {
    board
      .getAllPossibleForPiece(1, 1, 2)
      .then(legalmoves => {
        response.json({
          status: 'success',
          legalmoves,
          message: legalmoves
            ? 'Retrieved all legal move for selected piece'
            : 'Could not retrieve legal moves'
        });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  } else {
    response.status(500).json({
      status: 'Failure',
      legalmoves: request.params,
      message: 'Did not recive the nessesary parameters'
    });
  }
});

// TODO: I don't think this route is used; there was no chessgame variable in this file...
// router.get('/:gameid', ({ params: { gameid } }, response) => {
//   const boardState = chessgame.getBoardState(gameid);

//   response.json(boardState);
// });

module.exports = router;
