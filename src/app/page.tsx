'use client'

import { useEffect, useState } from 'react'
import SudokuBoard from '../components/SudokuBoard'
import { generateInitialBoard, isBoardValid } from '../utils/sudoku'

const Home = () => {
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [board, setBoard] = useState<number[][]>([])
  const [message, setMessage] = useState<string>('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'medium',
  )

  useEffect(() => {
    const newBoard = generateInitialBoard(difficulty)
    setInitialBoard(newBoard)
    setBoard(newBoard)
  }, [difficulty])

  const handleInputChange = (row: number, col: number, value: string) => {
    if (initialBoard[row][col] !== 0) return // Prevent changes to initial values

    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = board.map((rowArray, rowIndex) =>
        rowArray.map((cell, colIndex) =>
          rowIndex === row && colIndex === col
            ? value === ''
              ? 0
              : parseInt(value, 10)
            : cell,
        ),
      )
      setBoard(newBoard)
      setMessage('')
    }
  }

  const checkSolution = () => {
    if (isBoardValid(board)) {
      setMessage('Congratulations! The Sudoku is solved correctly.')
    } else {
      setMessage('The Sudoku solution is not correct. Please try again.')
    }
  }

  const resetGame = (
    newDifficulty: 'easy' | 'medium' | 'hard' = difficulty,
  ) => {
    setDifficulty(newDifficulty)
    const newBoard = generateInitialBoard(newDifficulty)
    setInitialBoard(newBoard)
    setBoard(newBoard)
    setMessage('')
  }

  const isCellCorrect = (row: number, col: number): boolean | null => {
    const num = board[row][col]
    if (num === 0) return null

    const originalNum = initialBoard[row][col]
    if (originalNum !== 0) return true

    const isValid = (
      num: number,
      pos: { row: number; col: number },
    ): boolean => {
      const { row, col } = pos

      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && col !== i) return false
        if (board[i][col] === num && row !== i) return false
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3)
        const boxCol = 3 * Math.floor(col / 3) + (i % 3)
        if (board[boxRow][boxCol] === num && row !== boxRow && col !== boxCol)
          return false
      }
      return true
    }

    return isValid(num, { row, col })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-gray-100 p-4">
      <div className="flex mb-4 gap-4">
        <button
          onClick={() => resetGame('easy')}
          className={`bg-blue-300 text-slate-900  px-4 py-2 rounded ${difficulty === 'easy' ? 'border border-black scale-125' : ''} mr-2`}
        >
          Easy
        </button>
        <button
          onClick={() => resetGame('medium')}
          className={`bg-green-300 text-slate-900 px-4 py-2 rounded ${difficulty === 'medium' ? 'border border-black scale-125' : ''} mr-2`}
        >
          Medium
        </button>
        <button
          onClick={() => resetGame('hard')}
          className={`bg-red-300 text-slate-900  px-4 py-2 rounded ${difficulty === 'hard' ? 'border border-black scale-125' : ''}`}
        >
          Hard
        </button>
      </div>

      {board.length > 0 && (
        <SudokuBoard
          board={board}
          initialBoard={initialBoard}
          handleInputChange={handleInputChange}
          isCellCorrect={isCellCorrect}
        />
      )}
      <div className="mt-4">
        <button
          onClick={checkSolution}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Check Solution
        </button>
        <button
          onClick={() => resetGame()}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          New Game
        </button>
      </div>
      {message && <div className="mt-4 text-lg">{message}</div>}
    </div>
  )
}

export default Home
