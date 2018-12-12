var moves = require('../chess-game/piece_moves.js')
var board = require('./board.js')

module.exports = {
    make_move: function (location, destination, player) {
        if (this.isPlayersTurn) {
            return true
        }
        return false
    },
    validate_move: function (location, destination) {

    },
    isPlayersTurn: function (playerID) {
        return true
    },
    pathIsBlocked: function (location, destination) {
        return false
    },
    validateID(id) {
        if (Number.isInteger(id) && !Number.isNaN(id)) {
            return true
        } else {
            return false
        }
    },
    getBoardState: function (gameId) {
        let boardpices = [];
        //Insert for each element returned from database here
        boardpices.push({
            "type": "rook",
            "isWhite": true,
            "cordX": 1,
            "cordY": 1
        });
        boardpices.push({
            "type": "rook",
            "isWhite": true,
            "cordX": 1,
            "cordY": 8
        });
        return boardpices
    },
    getLegalMoves: function (cordX, cordY) {

    },
    notOutOfBounds: function (cordX, cordY) {
        return (cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    },
    getPosibleMoves: function(piece){
        console.log(piece)
        if(piece.name === 'pawn'){
            this.getPosibleMovesPawn(piece)
            return this.getPosibleMovesPawn(piece).then(function(moves){
                return moves;
            })
        }
        
    },
    getPosibleMovesPawn: async function (piece) {
        var posibleMoves = [];
        var direction = (piece.isWhite)? 1 : -1
        pieceState = 0
        if (pieceState === 0) {
            posibleMoves.push([colum, row + (1*direction)])
            posibleMoves.push([colum, row + (2*direction)])
        } else {
            posibleMoves.push([colum, row + 1*direction])
        }
        if((piece.isWhite && piece.row === 4) || (!piece.isWhite && piece.row === 3)){
            var passantMoves = []
            passantMoves.push(moves.pawn_enPassant(piece.colum +1, piece.row + (1*direction), isWhite, piece.gameId))
            passantMoves.push(oves.pawn_enPassant(piece.colum +1, piece.row + (1*direction), isWhite, piece.gameId))
            
        }
        return posibleMoves
    }


   /*   getPassingTiles: function (piece, colum, row) {
        var passingTiles = [];

        //If is white moving positive direction, else moving negative
        if (piece.type === 'pawn') {
            if (piece.colum == colum) {
                if (piece.isWhite) {
                    if (row == piece.row +1) {
                    } else {


                    }
                }
            }

        }

    },*/,
    filterLegalmoves: function (piece, posibleMoves) {
        var legalMoves = []
        posibleMoves.forEach(element => {

        });
    }

}