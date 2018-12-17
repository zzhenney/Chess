

const getAllLegalMoves = (piece, boardData) => {
    if (piece.name == 'pawn') return legalMovesPawn(piece, boardData)
    if (piece.name == 'bishop') return legalMovesBishop(piece, boardData)
    if (piece.name == 'knight') return legalMovesKnight(piece, boardData)
    if (piece.name == 'queen') return legalMovesQueen(piece, boardData)
    if (piece.name == 'rook') return legalMovesRook(piece, boardData)
    if (piece.name == 'rook') return legalMovesKing(piece, boardData)
}

const legalMovesPawn = (piece, boardData) => {
    let v = 1//(piece.iswhite)? 1 : -1
    let legalMoves = []
    //Normal 1step move
    let tileStateFirst = tileOcupiedState(boardData, piece.col, piece.row + (1 * v))
    if (tileStateFirst == 0 || tileStateFirst == 1) legalMoves.push([piece.col, piece.row + (1 * v), tileStateFirst])
    //duble move step
    if (piece.state == 0 && tileStateFirst == 0) {
        let tileStateSecound = tileOcupiedState(boardData, piece.colum, piece.row + (2 * v))
        if (tileStateSecound == 0) legalMoves.push([piece.col, piece.row + (2 * v), tileStateSecound])
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
        if (currTileState == 0) {
            legalMoves.push([cordCol, cordRow, 0])
        } else if (currTileState == 1) {
            break;
        } else if (currTileState == 2) {
            legalMoves.push([cordCol, cordRow, 2])
            break;
        }
    }
    return legalMoves
}

const getMovesDirectionalSingle = (piece, boardData, vArray) => {
    let legalMoves = []

    directions.forEach(move => {
        if (logic.notOutOfBounds(move[0], move[1])) {
            let currTileState = tileOcupiedState(boardData, cordCol, cordRow)
            if (currTileState == 0) {
                legalMoves.push(move[0], move[1], 0)
            } else if (currTileState == 2) {
                legalMoves.push(move[0], move[1], 2)
            }
        }
    });
    return legalMoves
}

const tileOcupiedState = (boardData, colum, row, playerId) => {
    tile = searchT(boardData, colum, row)
    if (!tile) {
        return 0
    } else if (tile['id'] == playerId) {
        return 1
    } else {
        return 2
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
    pawn_legal_moves: function (playerColor, cordX, cordY) {
        let possibleMoves;
        if (board_interaction.tileIsEmpty(cordX, cordY + 1)) {
            possibleMoves.push([cordX, cordY + 1])
        }
        if (board_interaction.tileIsEmpty(cordX, cordY + 2)) {
            possibleMoves.push([cordX, cordY + 1])
        }

    },*/

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
    check_path_open: function (fromX, fromY, toX, toY) {
        if (fromX != toX && fromY != toY) {
            return this.check_path_blocked_diagonal(fromX, fromY, toX, toY)
        } else {
            return this.check_path_blocked_stright(fromX, fromY, toX, toY)
        }
    },
    check_path_open_stright: function (fromX, fromY, toX, toY) {
        if (fromY == toY && fromX != toX) {
            let differenceX = fromX - toX
            if (differenceX >= 0) {
                for (i = 0; i < differenceX; i++) {
                    if (!board_interaction.tileIsEmpty(fromX + i, fromY)) return false
                }
            } else {
                for (i = 0; i > differenceX; i--) {
                    if (!board_interaction.tileIsEmpty(fromX + i, fromY)) return false
                }
            }
            return true
        }
        else if (fromX == toX && fromY != toY) {
            let differenceY = fromY - toY
            if (differenceY >= 0) {
                for (i = 0; i < differenceY; i++) {
                    if (!board_interaction.tileIsEmpty(fromX, fromY + i)) return false
                }
            } else {
                for (i = 0; i > differenceX; i--) {
                    if (!board_interaction.tileIsEmpty(fromX, fromY + i)) return false
                }
            }
            return true
        }
    },
    check_path_open_stright: function (fromX, fromY, toX, toY) {
        let differenceX = fromX - toX
        let differenceY = fromY - toY

        if (differenceX != 0 && differenceY == 0 || differenceY != 0 && differenceX == 0) {
            let vX = ((differenceX != 0) ? differenceX / differenceX : 0)
            let vY = ((differenceY != 0) ? differenceY / differenceY : 0)
            let fields = ((differenceX > differenceY) ? differenceX : differenceY)

            for (i = 0; i < fields; i++) {
                if (!board_interaction.tileIsEmpty(fromX + i * vX, fromY + i * vY)) return false
            }
            return true;
        }
    },
    check_path_open_diagonal: function (fromX, fromY, toX, toY) {
        let differenceX = fromX - toX
        let differenceY = fromY - toX
        if (Math.abs(differenceX == Math.abs(difbferenceY))) {
            let vX = differenceX / differenceX
            let vY = differenceY / differenceY

            for (i = 0; i < differenceX; i++) {
                if (!board_interaction.tileIsEmpty(fromX + i * vX, fromY + i * vY)) return false
            }
            return true
        } else {
            console.log("Input data not diagonal")
            return false
        }
        return false
    }*/
