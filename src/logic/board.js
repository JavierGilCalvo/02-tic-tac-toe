import { WINNER_COMBOS } from "../constants"

export const checkEndGame = (newBoard) => {
    return !newBoard.includes(null)
}


export const checkWinner = (boardToCheck) => {
    // We check all the possible winner combos 
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) { // The combo is completely filled with the same symbol
            return boardToCheck[a]
        }
    }
    // no winner
    return null
}