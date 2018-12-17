

const getAllLegalMoves = (piece, boardData) => {
    console.log("Finding moves for: ", piece.name)
    if (piece.name == 'pawn') return legalMovesPawn(piece, boardData)
    if (piece.name == 'bishop') return legalMovesBishop(piece, boardData)
    if (piece.name == 'knight') return legalMovesKnight(piece, boardData)
    if (piece.name == 'queen') return legalMovesQueen(piece, boardData)
    if (piece.name == 'rook') return legalMovesRook(piece, boardData)
    if (piece.name == 'king') return legalMovesKing(piece, boardData)
}

const legalMovesPawn = (piece, boardData) => {
    let v = 1//(piece.iswhite)? 1 : -1
    let legalMoves = []
    let tileStateFirst = tileOcupiedState(boardData, piece.col, piece.row + (1 * v))
    if (tileStateFirst == 1 || tileStateFirst == 1) legalMoves.push([piece.col, piece.row + (1 * v), tileStateFirst])
    if (piece.state === 0 && tileStateFirst === 1) {
        let tileStateSecound = tileOcupiedState(boardData, piece.colum, piece.row + (2 * v))
        if (tileStateSecound == 1) legalMoves.push([piece.col, piece.row + (2 * v), tileStateSecound])
    }
    //Ignoring passant situation for to simplyfy it although most of the code for that situation is already written
    return legalMoves
}

const legalMovesQueen = (piece, boardData) => {
    let legalMoves = []
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, -1, -1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, -1, 0))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, -1, 1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 0, -1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 0, 1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 1, -1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 1, 0))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 1, 1))
    return legalMoves
}

const legalMovesBishop = (piece, boardData) => {
    let legalMoves = []
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, -1, -1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, -1, 1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 1, -1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 1, 1))
    return legalMoves
}

const legalMovesRook = (piece, boardData) => {
    let legalMoves = []
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 0, -1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 0, 1))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, -1, 0))
    legalMoves = legalMoves.concat(getMovesDirectional(piece, boardData, 1, 0))
    return legalMoves
}

const legalMovesKnight = (piece, boardData) => {
    let directions = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]
    return getMovesDirectionalSingle(piece, boardData, directions)
}

const legalMovesKing = (piece, boardData) => {
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    return getMovesDirectionalSingle(piece, boardData, directions)
}

const getMovesDirectional = (piece, boardData, vX, vY) => {
    let legalMoves = []
    for (i = 1; (i < 8); i++) {
        let cordCol = piece.col + vX * i
        let cordRow = piece.row + vY * i
        if (!notOutOfBounds(cordCol, cordRow)) {
            break;
        }
        let currTileState = tileOcupiedState(boardData, cordCol, cordRow)
        if (currTileState == 1) {
            legalMoves.push([cordCol, cordRow, 1])
        } else if (currTileState == 2) {
            break;
        } else if (currTileState == 3) {
            legalMoves.push([cordCol, cordRow, 3])
            break;
        }
    }
    return legalMoves
}

const getMovesDirectionalSingle = (piece, boardData, directions) => {
    let legalMoves = []

    directions.forEach(move => {
        let cordCol = piece.col + move[0]
        let cordRow = piece.row + move[1]
        if (notOutOfBounds(cordCol, cordRow)) {
            let currTileState = tileOcupiedState(boardData, cordCol, cordRow)
            if (currTileState == 1) {
                legalMoves.push([cordCol, cordRow, 1])
            } else if (currTileState == 3) {
                legalMoves.push([cordCol, cordRow, 3])
            }
        }
    });
    return legalMoves
}

const tileOcupiedState = (boardData, colum, row, playerId) => {
    tile = searchT(boardData, colum, row)
    if (!tile) {
        return 1
    } else if (tile['id'] == playerId) {
        return 2
    } else {
        return 3
    }

}

const searchT = (boardData, colum, row) => {
    return boardData.find(function (piece) {
        return (piece.col == colum && piece.row == row)
    })
}

const notOutOfBounds = (cordCol, cordRow) => {
    return (cordCol >= 0 && cordCol < 8 && cordRow >= 0 && cordRow < 8)
}

module.exports = {
    getAllLegalMoves: function (piece, boardData) {
        return getAllLegalMoves(piece, boardData)
    },
    searchTile: function (boardData, colum, row) {
        return searchT(boardData, colum, row)
    }

}

   /* pawn_enPassant: function (colum, row, iswhite, gameId) {
        if (board.notOutOfBounds(colum, row)) {
            board.getPieceAt(gameId, colum, row).then(piece => {
                if (piece.name === 'pawn' && piece.state === 2 && !iswhite) {
                    return [colum, row]
                } else {
                    return null
                }
            })
        }
        return null
    },
/*
    pawn_legal_passant_moves: function (playerColor, cordX, cordY) {
        let listOfPassantMoves
        if (board_interaction.piece_is_enemy_passant_pawn(cordX + 1, cordY)) {
            listOfPassantMoves.push([cordX + 1, cordY])
        }
        if (board_interaction.piece_is_enemy_passant_pawn(cordX - 1, cordY)) {
            listOfPassantMoves.push([cordX - 1, cordY])
        }
        return listOfPassantMoves
    },

    }*/
