var moves = require('./moves.js')
const db = require('../db');
const logic = require('./logic');
const {io} = require('../messaging');

const validatePossibleMove = async (possibleMoves, tocolum, torow) => {
    if (possibleMoves.length === 0) return false;
    let found = (possibleMoves.find(function (possiblemove) {
        return (possiblemove[0] == tocolum && possiblemove[1] == torow)
    }))
    if (found) {
        console.log("Found move: ", found[2])
        return found[2]
    }
}

const tryMakeMove = async (boardData, piece, tocolum, torow, gameInfo) => {
    console.log("Trying make move")
    //boardData = await getAllPieces(3); if (!boardData) return false;
    console.log("Trying make move: ", boardData, piece,tocolum, torow)
    let possibleMovesForPiece = moves.getAllLegalMoves(piece, boardData, gameInfo); if (!possibleMovesForPiece) return false;
    console.log("Possible moves:", possibleMovesForPiece)
    let validMove = validatePossibleMove(possibleMovesForPiece, tocolum, torow); if (!validMove) return false;
    return validMove
}

const getPieceFromDB = async (gameId, column, row) => {
    console.log("Querying pice")
    return db.oneOrNone('select * from game_pieces left join pieces on game_pieces."piece_id" = pieces.id left join games on game_pieces."game_id" =  games."id" where game_pieces."game_id" = $1 and game_pieces."col" = $2 and game_pieces."row" = $3', [gameId, column, row])
}
const makePieceObject = async (data) => {
    pieces = data.map(function(data){
        return { name: data["name"], col: data["col"], row: data["row"], userid: data['user_id'], state: data['state'], piece_id: data['id']  }
    })
    return pieces
}
const getPieceData = async (gameId, column, row) => {
    return getPieceFromDB(gameId, column, row)
        .then(data => {
            if (data) {
                return data
            } else {
                return null
            }
        })
}
const pieceIsEnemy = (piece, targetPiece) => {
    return (piece.isWhite != targetPiece.isWhite)
}
const moveAttack = async (game_id, piece, targetPiece, state) => {
    console.log("Target" , targetPiece)
    db.tx(t => {
        return t.batch([
            t.none('update game_pieces set col = 99, row = 99, state = $3 where "game_id" = $1 and "piece_id" = $2', [game_id, targetPiece.piece_id, state]),
            t.none('update game_pieces set col = $3, row = $4, state = $5 where "game_id" = $1 and "piece_id" = $2', [game_id, piece.piece_id, targetPiece.col, targetPiece.row, state])
        ]).then(async data =>{
            let turnChanged = await changeTurn(game_id, piece.userid)
            return true
        }).catch(err=>{
            console.log(err)
        })
    })
    return false
}

const changeTurn = async (game_id, user_id) =>{
    console.log("Changing turn", game_id, user_id)
    return db.one('UPDATE games SET next_user=subquery.user_id FROM (SELECT user_id FROM  game_users where game_id = $1 and user_id != $2) AS subquery WHERE id = $1;', [game_id, user_id])
    .then((data)=>{
        console.log("Player turn changed")
        console.log(data)
    })
}

const move = async (game_id, piece, tocolumn, torow, state) => {
    console.log(piece)
    console.log(game_id, piece.piece_id, tocolumn, torow, state)
    if(game_id != null && piece.piece_id != null && tocolumn !=null && torow != null){
        db.any('update game_pieces set col = $3, row = $4, state = $5 where "game_id" = $1 and "piece_id" = $2', [game_id, piece['piece_id'], tocolumn, torow, state])
        let turnChanged = await changeTurn(game_id, piece.userid)
        return "Successfully moved the piece"
    }else{
        console.log("Cannot move, lacks input data")
        console.log(game_id, piece.piece_id, tocolumn, torow)
        return false;
    }
    return "Move failed"
}
const tilesisBlocked = async (game_id, tileCords) => {
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

const getAllPieces = async (forGameId) => {
    //console.log("Gameid: ", forGameId)
    return db.task(t => {
        const getWhite = t.oneOrNone('select white_user, next_user from games where id = $1', forGameId)
        const pieces = t.any('select * from game_pieces left join pieces on game_pieces."piece_id" = pieces."id" where game_pieces."game_id" = $1', forGameId)
        return t.batch([getWhite, pieces])
    }).then(data => {
        return data
    }).catch(error=>{
        console.log("Error", error)
    })
    //return db.any('select * from  game_pieces left join pieces on game_pieces."piece_id" = pieces."id" where game_pieces."game_id" = $1', forGameId)
}

const possibleMoves = async (game_id, cordX, cordY) => {
    boardData = await getAllPieces(game_id); if (!boardData) return false;
    console.log("Get boarddata success")
    console.log(cordX, cordY)
    let piece = await moves.searchTile(boardData, cordX, cordY); if (!piece) return false;
    console.log("Tile searched:", piece)
    return moves.getAllLegalMoves(piece, boardData)
}

const isPlayersTurn = (playerId, gameInfo) =>{
    console.log("Is player turn")
    console.log("++++++++",gameInfo, gameInfo['next_user'])
    return playerId == gameInfo['next_user']
}

const checkIfInCheck = (fromcol, fromrow, tocol, torow, boardData, gameInfo) =>{
    console.log("Checking if in check")
    let board = boardData.slice()
    console.log(fromcol, fromrow, tocol, torow, boardData, gameInfo)
    let pieceToMove = (board.find(function (pice) {
        return (pice.col == fromcol && pice.row == fromrow)
    }))
    console.log(pieceToMove)
    pieceToMove.col = tocol
    pieceToMove.row = torow
    let possibleEnemyAttackMoves = []
    board.forEach(piece =>{
        if(piece.userid != gameInfo['userid']){
            moves.getAllLegalMoves(piece, board,gameInfo).forEach(m=>{
                if(m[2] === 3){
                    possibleEnemyAttackMoves.push(m)
                }
            })
        }
    })
    console.log("b",board)
    let friendlyKing = board.find(piece=>{
        console.log("p", piece, piece['userid'] , gameInfo['userid'], piece['name'])
        console.log(piece['userid'] === gameInfo['userid'], piece['userid'], gameInfo['userid'])
        console.log(piece['name'] === 'king', piece['name'])
        if(piece['userid'] === gameInfo['userid'] && piece['name'] === 'king'){
            console.log("Found friendly king")
            return piece
        }
    })
    console.log("Friendly king",friendlyKing)
    return possibleEnemyAttackMoves.map(move=>{
        if(move[0] == friendlyKing['col'] && move[1] == friendlyKing['row']){
            console.log("King is in check, aborting move")
            return true
        }
        else{
            console.log("King is not in check, continuing")
        }
    }).filter(function(item){return item;})[0]
}


module.exports = {
    tilesIsBlocked: async function (game_id, tileCords) {
        return tilesisBlocked(game_id, tileCords)
    },
    movePiece: async function (game_id, fromcolumn, fromrow, tocolumn, torow, userid) {
        console.log("moving")
        let boarddata = await getAllPieces(game_id);
       // console.log("Found board data:", boarddata)
        let gameInfo = boarddata[0]
        gameInfo['userid'] = userid
        let pieces = await boarddata[1]
        console.log("Is current players turn: ", isPlayersTurn(userid, gameInfo))
        if(!isPlayersTurn(userid, gameInfo)) return "Currently isn't the current players turn, please wait for the other player to make a move";
        pieces = await makePieceObject(pieces)
        
        console.log("Gameinfo: ", gameInfo)
        console.log("Pieces:", pieces)
         if(!(boarddata)){
            console.log("couldnt find boarddata")
            return "Internal Failule getting data"
         } 
         console.log("Getting piece")
        let piece = moves.searchTile(pieces, fromcolumn, fromrow)
        if(!piece){
            console.log("No piece found")
         return "Couldn't find pice on cordinate. Empty tile?"
        }
        if(piece.userid != userid) {
            console.log(piece.userid, userid)
            console.log("Move denied as this piece is not owned by the current user")
            return "Move denied as this piece is not owned by the current user"
        }else{
            console.log("Move allowed for user", userid)
        }
       // let piece = await getPieceData(game_id, fromcolumn, fromrow); if (!piece) return false;

        console.log("Got pice: ", piece)
        let isValid = await tryMakeMove(pieces, piece, tocolumn, torow, gameInfo)

        let pieceAtTarget = moves.searchTile(pieces, tocolumn, torow)
        console.log("Piece at target: ", pieceAtTarget)
        console.log("Valid", isValid)
        let state = 1

        let inCheck = checkIfInCheck(piece.col, piece.row, tocolumn, torow, pieces, gameInfo)
        if(inCheck){
            return "Move setting users king in check. Aborting please make another move, or surender"
        }
        console.log("Valid",isValid)
        console.log(inCheck)
        if (isValid == 3) {
            console.log("Attacking with piece")
            console.log(game_id, piece, pieceAtTarget)
            let moveSuccess = await moveAttack(game_id, piece, pieceAtTarget, state)
            console.log("Move success", moveSuccess)
            return "Attacking piece successfull"
        } else if (isValid === 1) {
            console.log("Moving piece")
            if(piece.name === 'pawn' && piece.state === 0 && Math.abs(piece.row - torow) === 2){
                //Special state for pawn after it have moved 2 steps, enabeling it to be attacked with the passant attack by other pawns
                state = 2
            }
            let moveSuccess = await move(game_id, piece, tocolumn, torow, state)
            return "Successfully moved the pice"
        } else {
            return "Field is blocked Cannot move, doing nothing"
        }
        io.emit(`move_${game_id}`);
        return moveSuccess
    },
    getAllPossibleForPiece: async function (gameId, column, row) {
        console.log(getAllPieces(3))
        console.log("<<<<<")
        return await possibleMoves(gameId, column, row)
    },
    isOutOfBounds: function (cordX, cordY) {
        return (cordX >= 0 && cordX < 8 && cordY >= 0 && cordY < 8)
    },
    getAllPieces: function () {
        return (getAllPieces(3))
    }
}