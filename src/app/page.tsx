'use client'

import { useEffect, useState } from 'react'
import SudokuBoard from '@/components/SudokuBoard'
import Loading from '@/components/Loading'
import { generateInitialBoard, isBoardValid } from '@/utils/sudoku'
import InfoModal from '@/components/InfoModal'
import Message from '@/components/Message'
import InfoIcon from '@/components/icons/Info'
import DifficultyButtons from '@/components/DifficultyButtons'

const LOCAL_STORAGE_KEY = 'sudokuGameState'

const Home = () => {
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [board, setBoard] = useState<number[][]>([])
  const [message, setMessage] = useState<string>('')
  const [difficulty, setDifficulty] = useState<
    'easy' | 'medium' | 'hard' | 'insane'
  >('medium')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedGame = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedGame) {
      const { savedBoard, savedInitialBoard, savedDifficulty } =
        JSON.parse(savedGame)
      setBoard(savedBoard)
      setInitialBoard(savedInitialBoard)
      setDifficulty(savedDifficulty)
      setLoading(false)
    } else {
      initializeBoard(difficulty)
    }
  }, [])

  useEffect(() => {
    if (board.length > 0 && initialBoard.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          savedBoard: board,
          savedInitialBoard: initialBoard,
          savedDifficulty: difficulty,
        }),
      )
    }
  }, [board, initialBoard, difficulty])

  const initializeBoard = (
    difficulty: 'easy' | 'medium' | 'hard' | 'insane',
  ) => {
    setLoading(true)
    const newBoard = generateInitialBoard(difficulty)
    setInitialBoard(newBoard)
    setBoard(newBoard)
    setLoading(false)
  }

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

      checkSolution(newBoard)
    }
  }

  const checkSolution = (newBoard: number[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newBoard[i][j] === 0) {
          setMessage('Please fill all cells before checking the solution.')
          return
        }
      }
    }

    if (isBoardValid(newBoard)) {
      setMessage('Congratulations! The Sudoku is solved correctly.')
    }
  }

  const resetGame = (
    newDifficulty: 'easy' | 'medium' | 'hard' | 'insane' = difficulty,
  ) => {
    setDifficulty(newDifficulty)
    initializeBoard(newDifficulty)
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

  const isRowCorrect = (row: number): boolean => {
    const rowValues = board[row]
    const filtered = rowValues.filter((num) => num !== 0)
    return new Set(filtered).size === 9
  }

  const isColCorrect = (col: number): boolean => {
    const colValues = board.map((row) => row[col])
    const filtered = colValues.filter((num) => num !== 0)
    return new Set(filtered).size === 9
  }

  const isBlockCorrect = (row: number, col: number): boolean => {
    const startRow = row - (row % 3)
    const startCol = col - (col % 3)
    const blockValues = []
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        blockValues.push(board[startRow + i][startCol + j])
      }
    }
    const filtered = blockValues.filter((num) => num !== 0)
    return new Set(filtered).size === 9
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <span
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 bg-white shadow-md hover:scale-110 hover:bg-gray-500 hover:cursor-pointer p-2 rounded-full"
          >
            <InfoIcon />
          </span>
          <DifficultyButtons difficulty={difficulty} resetGame={resetGame} />
          {board.length > 0 && (
            <SudokuBoard
              board={board}
              initialBoard={initialBoard}
              handleInputChange={handleInputChange}
              isCellCorrect={isCellCorrect}
              isRowCorrect={isRowCorrect}
              isColCorrect={isColCorrect}
              isBlockCorrect={isBlockCorrect}
            />
          )}
          <div className="mt-4">
            <button
              onClick={() => resetGame()}
              className="bg-red-500 text-white px-4 py-2 hover:scale-110 rounded"
            >
              New Game
            </button>
          </div>
          <Message message={message} />
          {isModalOpen && <InfoModal onClose={() => setIsModalOpen(false)} />}
        </>
      )}
    </div>
  )
}

export default Home
