const db = require('../db');
const logic = require('./logic');
module.exports = {
    movePiece: function(game_id, fromcolumn, fromrow, tocolum, torow){
        if(game_id && fromcolumn && fromrow && tocolum && torow){
        this.getPieceAt(game_id, fromcolumn, fromrow).then(function(piece){
            console.log(piece)
            if(piece){
                let possiblemoves = []
                possibleMoves = logic.getPosibleMoves(game_id, fromcolumn, fromrow)
                var successfullMove = possibleMoves.find(function(possiblemove){
                    return (possiblemove.column === tocolum && possiblemove.row === torow)
                })
                if(successfullMove){
                    
                }
            }

        }
        )
    }else{
        console.log("Invalid parameters supplied to movePiece in game: " + game_id)
    }
    },
    makeAttack: function(piece, tocolum, torow){
        

        db.tx(t=>{
            return t.batch([
                t.none('update game_pieces set col = $3, row = $4 where "gameId" = $1 and "pieceId" = $2 and id', [piece.gameId, piece.pieceId, 'NULL', 'NULL']),
                t.none('update game_pieces set col = $3, row = $4 where "gameId" = $1 and "pieceId" = $2', [piece.gameId, piece.pieceId, tocolum, torow])
            ])
        })
        db.one('update game_pieces set col = $3, row = $4 where "gameId" = $1 and "pieceId" = $2', piece.gameId, piece.pieceId, tocolum, torow).then(function (data) {
            //console.log(data)

            var piece = {name: data["name"], col: data["col"], row: data["row"], isWhite: (data["whiteUserId"] == data["id"]), state: 0}
            console.log(piece)
            return piece
        }).catch(err=>{
            console.log(err)
        });


        
    },
    isEnemyPieceAt: function (cordX, cordY) {
        return 1
    },
    getPieceAt: async function (gameId, column, row) {
        console.log("GameId: " + gameId)
        console.log("Column: " + column)
        console.log('Row: ' + row)
        return db.one('select * from game_pieces left join pieces on game_pieces."pieceId" = pieces.id left join games on game_pieces."gameId" =  games."gameId" where game_pieces."gameId" = $1 and game_pieces."col" = $2 and game_pieces."row" = $3',[ gameId, column, row]).then(function (data) {
            //console.log(data)
            if(data){
            var piece = {name: data["name"], col: data["col"], row: data["row"], isWhite: (data["whiteUserId"] == data["id"]), state: 0}
            console.log(piece)
            return piece
            }else{
                console.log('No db output from getPiece At:')
                console.log(data)
            }
        }).catch(err=>{
            console.log("Error get pice at:")
            console.log(err)
            return null
        });
        
        
    },
    tileIsEmpty: async function (gameId, column, row) {
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