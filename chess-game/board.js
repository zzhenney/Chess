const db = require('../db');
const logic = require('./logic');

const validatePossibleMove = async (possibleMoves, tocolum, torow) => {
    if (possibleMoves.length === 0) return false;
    return Boolean(possibleMoves.find(function (possiblemove) {
        return (possiblemove[0] == tocolum && possiblemove[1] == torow)
    }))

}

const tryMakeMove = async (piece, tocolum, torow) =>{
    let possibleMovesForPiece = await logic.getPosibleMoves(piece); if(!possibleMovesForPiece) return false;
    console.log("Get Possible moves success")
    let validMove = await validatePossibleMove(possibleMovesForPiece, tocolum, torow); if(!validMove) return false;
    console.log("Valid move Sucessfull")
    return validMove
}

const getPieceFromDB = async (gameId, column, row) =>{
    return db.oneOrNone('select * from game_pieces left join pieces on game_pieces."pieceId" = pieces.id left join games on game_pieces."gameId" =  games."gameId" where game_pieces."gameId" = $1 and game_pieces."col" = $2 and game_pieces."row" = $3', [gameId, column, row])
}
const makePieceObject = async (data) =>{
    console.log(data)
    return { name: data["name"], col: data["col"], row: data["row"], isWhite: (data["whiteUserId"] == data["id"]), state: 0, pieceId: data["pieceId"] }
}
const getPieceData = async (gameId, column, row) =>{
    return getPieceFromDB(gameId, column, row)
    .then(data => (data)? makePieceObject(data) : null)
}
const pieceIsEnemy = (piece, targetPiece) =>{
    return (piece.isWhite != targetPiece.isWhite)
}
const moveAttack = async (game_id, piece, targetPiece) =>{
    db.tx(t => {
        return t.batch([
            t.none('update game_pieces set col = NULL, row = NULL where "gameId" = $1 and "pieceId" = $2', [game_id, targetPiece.pieceId]),
            t.none('update game_pieces set col = $3, row = $4 where "gameId" = $1 and "pieceId" = $2', [game_id, piece.pieceId, targetPiece.col, targetPiece.row])
        ])
    })
}
const move = async (game_id, piece, tocolumn, torow) =>{
    db.none('update game_pieces set col = $3, row = $4 where "gameId" = $1 and "pieceId" = $2',[game_id, piece.pieceId, tocolumn, torow])
    .then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
    return false

}


module.exports = {
    movePiece: async function (game_id, fromcolumn, fromrow, tocolumn, torow) {
        let piece = await getPieceData(game_id, fromcolumn, fromrow); if (!piece) return false;
        console.log(piece)
        let isValid = await tryMakeMove(piece,tocolumn,torow)
        if(!isValid) console.log("Moving piece from col:" + fromcolumn + ", row: " + fromrow + " to col:" + tocolum + ", row:" + torow + " is a invalid move." )
        let pieceAtTarget = await getPieceData(game_id, tocolumn, torow) 
        console.log(pieceAtTarget)
        if(pieceAtTarget){
            if (!pieceIsEnemy(piece, pieceAtTarget)) return false;
            let attackSucess = await moveAttack(game_id, piece, pieceAtTarget) 
            console.log(attackSucess)
        }
        let moveSuccess = await move(game_id,piece,tocolumn,torow)
        console.log(moveSuccess)
        return moveSuccess



    },
    makeAttack: function (piece, tocolum, torow) {



        db.one('update game_pieces set col = $3, row = $4 where "gameId" = $1 and "pieceId" = $2', piece.gameId, piece.pieceId, tocolum, torow).then(function (data) {
            //console.log(data)

            var piece = { name: data["name"], col: data["col"], row: data["row"], isWhite: (data["whiteUserId"] == data["id"]), state: 0 }
            console.log(piece)
            return piece
        }).catch(err => {
            console.log(err)
        });
    },
    isEnemyPieceAt: function (cordX, cordY) {
        return 1
    },
    tileIsEmpty: async function (gameId, column, row) {
        if (this.isOutOfBounds(cordX, cordY)) {
            db.oneOrNone('select 1 from game_pieces where game_id = $1 and col = $2 and row = $3', gameId, column, row).then(function (data) {
                return (!(data))
            })
        }
        return false
    },
    isOutOfBounds: function (cordX, cordY) {
        return (cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    },


}