module.exports = {
    isEnemyPieceAt: function(cordX, cordY) {
        return 1
    },
    tileIsEmpty: function(cordX, cordY) {
        if (this.isOutOfBounds(cordX, cordY)) {
            return false
        }
        return true
    },
    piece_is_enemy_passant_pawn: function (playerColor, cordX, cordY) {
        // TODO: Make special pawn type for pawn which moved two field last turn. These pawns need to loose the Passant status next time the turn goes back to the player
        // Implement Check if enemy pawn at tile which moved two fields last turn. If yes return true.
        return true
    },
    isOutOfBounds(cordX, cordY) {
        return (cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    }

}