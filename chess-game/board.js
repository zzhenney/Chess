const db = require('../db');
module.exports = {
    isEnemyPieceAt: function (cordX, cordY) {
        return 1
    },
    getPieceAt: function (gameId, column, row) {
        db.one('select * from game_pieces left join pieces on game_pieces.pieceId = pieces.id where game_id = $1 and col = $2 and row = $3', gameId, column, row).then(function (data) {
            return data
        })
    },
    tileIsEmpty: function (gameId, column, row) {
        if (this.isOutOfBounds(cordX, cordY)) {
            db.oneOrNone('select 1 from game_pieces where game_id = $1 and col = $2 and row = $3', gameId, column, row).then(function (data) {
                return (!(data))
            })
        }
        return false
    },
    piece_is_enemy_passant_pawn: function (playerColor, cordX, cordY) {
        // TODO: Make special pawn type for pawn which moved two field last turn. These pawns need to loose the Passant status next time the turn goes back to the player
        // Implement Check if enemy pawn at tile which moved two fields last turn. If yes return true.
        return true
    },
    isOutOfBounds: function (cordX, cordY) {
        return (cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    },


}