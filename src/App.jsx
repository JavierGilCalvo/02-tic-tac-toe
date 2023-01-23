import { useState } from 'react'
import './App.css'
import { checkEndGame, checkWinner } from './logic/board'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import confetti from 'canvas-confetti'
import { Board } from './components/Board'
import { saveGameToStorage, resetGameStorage } from './logic/storage/storage'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // null: no winner yet - false: draw - true: winner


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }


  const updateBoard = (index) => {
    // We don't update an already filled position
    if (board[index] || winner) return

    // Board update
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Swap turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Save the game info
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Check Winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de Nuevo</button>
      <Board board={board} updateBoard={updateBoard}></Board>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>

    </main>
  )
}

export default App
