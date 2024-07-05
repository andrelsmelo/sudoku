'use client'

import { useEffect, useState } from 'react'
import SudokuBoard from '../components/SudokuBoard'
import { generateInitialBoard, isBoardValid } from '../utils/sudoku'
import InfoModal from '@/components/InfoModal'

const Home = () => {
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [board, setBoard] = useState<number[][]>([])
  const [message, setMessage] = useState<string>('')
  const [difficulty, setDifficulty] = useState<
    'easy' | 'medium' | 'hard' | 'insane'
  >('medium')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [key, setKey] = useState(0) // Use a key to force re-render

  const initializeBoard = (
    difficulty: 'easy' | 'medium' | 'hard' | 'insane',
  ) => {
    const newBoard = generateInitialBoard(difficulty)
    setInitialBoard(newBoard)
    setBoard(newBoard)
  }

  useEffect(() => {
    initializeBoard(difficulty)
  }, [difficulty, key]) // Re-initialize board when difficulty or key changes

  const handleInputChange = (row: number, col: number, value: string) => {
    if (initialBoard[row][col] !== 0) return

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
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          setMessage('Please fill all cells before checking the solution.')
          return
        }
      }
    }

    if (isBoardValid(board)) {
      setMessage('Congratulations! The Sudoku is solved correctly.')
    } else {
      setMessage('The Sudoku solution is not correct. Please try again.')
    }
  }

  const resetGame = (
    newDifficulty: 'easy' | 'medium' | 'hard' | 'insane' = difficulty,
  ) => {
    setDifficulty(newDifficulty)
    setKey((prevKey) => prevKey + 1) // Force re-initialization
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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <span
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 bg-white shadow-md hover:scale-110 hover:bg-gray-500 hover:cursor-pointer p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width={24}
          height={24}
        >
          <rect width="256" height="256" fill="none" />
          <circle cx="128" cy="180" r="12" />
          <path
            d="M128,144v-8c17.67,0,32-12.54,32-28s-14.33-28-32-28S96,92.54,96,108v4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <circle
            cx="128"
            cy="128"
            r="96"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </span>
      <div className="flex flex-wrap mb-4 gap-2 sm:gap-4">
        <button
          onClick={() => resetGame('easy')}
          className={`bg-blue-300 text-slate-900 hover:cursor-pointer hover:scale-110 px-4 py-2 transition-all ease-in-out rounded ${difficulty === 'easy' ? 'border border-black' : ''}`}
        >
          Easy
        </button>
        <button
          onClick={() => resetGame('medium')}
          className={`bg-green-300 text-slate-900 hover:cursor-pointer hover:scale-110 px-4 py-2 transition-all ease-in-out rounded ${difficulty === 'medium' ? 'border border-black' : ''}`}
        >
          Medium
        </button>
        <button
          onClick={() => resetGame('hard')}
          className={`bg-red-300 text-slate-900 hover:cursor-pointer hover:scale-110 px-4 py-2 transition-all ease-in-out rounded ${difficulty === 'hard' ? 'border border-black' : ''}`}
        >
          Hard
        </button>
        <button
          onClick={() => resetGame('insane')}
          className={`bg-black text-white hover:cursor-pointer hover:scale-110 px-4 py-2 transition-all ease-in-out rounded ${difficulty === 'insane' ? 'border border-black' : ''}`}
        >
          Insane
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
          className="bg-blue-500 text-white px-4 py-2 hover:scale-110 rounded mr-2"
        >
          Check Solution
        </button>
        <button
          onClick={() => resetGame()}
          className="bg-red-500 text-white px-4 py-2 hover:scale-110 rounded"
        >
          New Game
        </button>
      </div>
      {message && <div className="mt-4 text-lg">{message}</div>}
      {isModalOpen && <InfoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Home
