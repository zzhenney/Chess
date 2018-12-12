var board = require('./board.js')
module.exports = {

    pawn_enPassant: function(colum, row, iswhite, gameId){
        if(board.notOutOfBounds(colum, row)){
            board.getPieceAt(gameId, colum, row).then(piece=>{
                if(piece.name === 'pawn' && piece.state === 2 && !iswhite){
                    return [colum, row]
                }else{
                    return null
                }
            })
        } 
        return null
    },










    pawn_legal_moves: function(playerColor, cordX, cordY){
        let possibleMoves;
        if(board_interaction.tileIsEmpty(cordX, cordY+1)){
            possibleMoves.push([cordX, cordY+1])
        }
        if(board_interaction.tileIsEmpty(cordX, cordY+2)){
            possibleMoves.push([cordX, cordY+1])
        }

    },
    pawn_legal_passant_moves: function(playerColor,cordX, cordY){
        let listOfPassantMoves
        if(board_interaction.piece_is_enemy_passant_pawn(cordX+1, cordY)){
            listOfPassantMoves.push([cordX+1, cordY])
        }
        if(board_interaction.piece_is_enemy_passant_pawn(cordX-1, cordY)){
            listOfPassantMoves.push([cordX-1, cordY])
        }
        return listOfPassantMoves
    },
    check_path_open: function(fromX, fromY, toX, toY){
        if(fromX != toX && fromY != toY){
            return this.check_path_blocked_diagonal(fromX, fromY, toX, toY)
        }else{
            return this.check_path_blocked_stright(fromX, fromY, toX, toY)
        }
    },
  /*  check_path_open_stright: function(fromX, fromY, toX, toY){
        if(fromY == toY && fromX != toX){
            let differenceX = fromX - toX
            if(differenceX >= 0){
                for(i = 0; i < differenceX; i++){
                        if(!board_interaction.tileIsEmpty(fromX + i, fromY)) return false
                }
            }else{
                for(i = 0; i > differenceX; i--){
                    if(!board_interaction.tileIsEmpty(fromX + i, fromY)) return false
                }
            }
            return true
        }
        else if(fromX == toX && fromY != toY){
            let differenceY = fromY - toY
            if(differenceY >= 0){
                for(i = 0; i < differenceY; i++){
                        if(!board_interaction.tileIsEmpty(fromX, fromY + i)) return false
                }
            }else{
                for(i = 0; i > differenceX; i--){
                    if(!board_interaction.tileIsEmpty(fromX, fromY+ i)) return false
                }
            }
            return true
        }
    },*/
    check_path_open_stright: function(fromX, fromY, toX, toY){
        let differenceX = fromX - toX
        let differenceY = fromY - toY

        if(differenceX != 0 && differenceY == 0 || differenceY != 0 && differenceX == 0 ){
            let vX = ((differenceX != 0) ? differenceX / differenceX : 0)
            let vY = ((differenceY != 0) ? differenceY / differenceY : 0)
            let fields = ((differenceX > differenceY)? differenceX : differenceY)

            for(i = 0; i < fields; i++){
                if(!board_interaction.tileIsEmpty(fromX + i * vX, fromY + i * vY)) return false
            }
            return true;
        }
    },
    check_path_open_diagonal: function(fromX, fromY, toX, toY){
        let differenceX = fromX - toX
        let differenceY = fromY - toX
        if(Math.abs(differenceX == Math.abs(difbferenceY))){
            let vX = differenceX / differenceX
            let vY = differenceY / differenceY

            for(i = 0; i < differenceX; i++){
                if(!board_interaction.tileIsEmpty(fromX + i*vX, fromY + i*vY)) return false
            }
            return true
        }else{
            console.log("Input data not diagonal")
            return false
        }
        return false
    }  
}