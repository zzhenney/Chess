var chessgame = require('../chess-game/piece_moves.js')

module.exports = {
    make_move: function(location, destination, player){
        if(this.isPlayersTurn){
            return true
        }
        return false
    },
    validate_move: function(location, destination){
        
    },
    isPlayersTurn: function(playerID){
        return true
    },
    pathIsBlocked: function(location, destination){
        return false
    },
    validateID(id){
        if(Number.isInteger(id) && !Number.isNaN(id)){
            return true
        }else{
            return false
        }
    }, 
    getBoardState: function(gameId){
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
    getLegalMoves(cordX, cordY){
        
    },
    isOutOfBounds(cordX,cordY){
        return(cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    }

}