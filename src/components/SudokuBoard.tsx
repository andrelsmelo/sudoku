'use client'

import React from 'react'

interface SudokuBoardProps {
  board: number[][]
  initialBoard: number[][]
  handleInputChange: (row: number, col: number, value: string) => void
  isCellCorrect: (row: number, col: number) => boolean | null
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  initialBoard,
  handleInputChange,
  isCellCorrect,
}) => {
  return (
    <div className="grid grid-cols-9 gap-1">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            value={cell === 0 ? '' : cell}
            onChange={(e) =>
              handleInputChange(rowIndex, colIndex, e.target.value)
            }
            maxLength={1}
            readOnly={initialBoard[rowIndex][colIndex] !== 0}
            className={`w-10 h-10 text-center border-2 ${
              initialBoard[rowIndex][colIndex] !== 0
                ? 'bg-gray-200 border-gray-400'
                : board[rowIndex][colIndex] === 0
                  ? 'border-gray-400'
                  : isCellCorrect(rowIndex, colIndex)
                    ? 'border-green-500'
                    : 'border-red-500'
            }`}
          />
        )),
      )}
    </div>
  )
}

export default SudokuBoard
