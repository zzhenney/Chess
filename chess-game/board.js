var moves = require('./moves.js')
const db = require('../db');
const logic = require('./logic');

const validatePossibleMove = async (possibleMoves, tocolum, torow) => {
    if (possibleMoves.length === 0) return false;
    let found = (possibleMoves.find(function (possiblemove) {
        return (possiblemove[0] == tocolum && possiblemove[1] == torow)
    }))
    console.log("Found: ", found)
    if(found){
        console.log("Validmove returning: ", found[2])
        return found[2]
    }
}

const tryMakeMove = async (piece, tocolum, torow) =>{
    boardData = await getAllPieces(3); if(!boardData) return false;
    let possibleMovesForPiece = await moves.getAllLegalMoves(piece, boardData); if(!possibleMovesForPiece) return false;
    console.log("Possilbe moves:", possibleMovesForPiece)
    let validMove = await validatePossibleMove(possibleMovesForPiece, tocolum, torow); if(!validMove) return false;
    console.log("Valiaadmove: ",  validMove)
    return validMove
}

const getPieceFromDB = async (gameId, column, row) =>{
    return db.oneOrNone('select * from game_pieces left join pieces on game_pieces."piece_id" = pieces.id left join games on game_pieces."game_id" =  games."id" where game_pieces."game_id" = $1 and game_pieces."col" = $2 and game_pieces."row" = $3', [gameId, column, row])
}
const makePieceObject = async (data) =>{
    return { name: data["name"], col: data["col"], row: data["row"], isWhite: (data["whiteUserId"] == data["id"]), state: 0, piece_id: data["piece_id"] }
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
            t.none('update game_pieces set col = NULL, row = NULL where "game_id" = $1 and "piece_id" = $2', [game_id, targetPiece.piece_id]),
            t.none('update game_pieces set col = $3, row = $4 where "game_id" = $1 and "piece_id" = $2', [game_id, piece.piece_id, targetPiece.col, targetPiece.row])
        ])
    })
}
const move = async (game_id, piece, tocolumn, torow) =>{
    console.log(game_id, piece.piece_id, tocolumn, torow)
    db.none('update game_pieces set col = $3, row = $4 where "game_id" = $1 and "piece_id" = $2',[game_id, piece.piece_id, tocolumn, torow])
    .then(()=>{
        console.log("Move successful")
        return true;
    }).catch(()=>{
        console.log("Move failed")
        return false;
    })
    return false
}
const tilesisBlocked = async (game_id, tileCords) =>{
    db.tx(t => {
        var queries = []
        tileCords.forEach(cords => {
            queries.push(t.oneOrNone('select * from game_pieces where game_pieces."gameId" = $1 and game_pieces."col" = $2 and game_pieces."row" = $3', [gameId, cords[0], cords[1]]))
        });
        
        return t.batch(queries);
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        return null;
    });
}

const getAllPieces = async (forGameId) =>{
    return db.any('select * from  game_pieces left join pieces on game_pieces."piece_id" = pieces."id" where game_pieces."game_id" = $1', forGameId)
}

const possibleMoves = async (game_id, cordX, cordY) =>{
    boardData = await getAllPieces(game_id); if(!boardData) return false;
    let piece = await moves.searchTile(boardData, cordX, cordY); if(!piece) return false;
    return moves.getAllLegalMoves(piece, boardData)
}

module.exports = {
    tilesIsBlocked: async function(game_id, tileCords){
        return tilesisBlocked(game_id, tileCords)
    },
    movePiece: async function (game_id, fromcolumn, fromrow, tocolumn, torow) {
        let piece = await getPieceData(game_id, fromcolumn, fromrow); if (!piece) return false;
        let isValid = await tryMakeMove(piece,tocolumn,torow)
        console.log("Valid: ", isValid)
        if(isValid == 3){
            console.log("Attacking with piece")
            let moveSuccess = await moveAttack(game_id, piece, pieceAtTarget) 
        }else if(isValid === 1){
            console.log("Moving piece")
            let moveSuccess = await move(game_id,piece,tocolumn,torow)
        }else{
            return false
        }
        
        return moveSuccess
    },
    makeAttack: function (piece, tocolum, torow) {
        db.one('update game_pieces set col = $3, row = $4 where "game_id" = $1 and "piece_id" = $2', piece.gameId, piece.piece_id, tocolum, torow).then(function (data) {
            var piece = { name: data["name"], col: data["col"], row: data["row"], isWhite: (data["whiteUserId"] == data["id"]), state: 0 }
            return piece
        }).catch(err => {
            console.log(err)
        });
    },
    getAllPossibleForPiece: async function (gameId, column, row) {
        return await possibleMoves(gameId, column, row)
    },
    isOutOfBounds: function (cordX, cordY) {
        return (cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    }
}