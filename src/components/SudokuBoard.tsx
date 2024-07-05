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
    <div className="grid grid-cols-9 gap-0">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isInitial = initialBoard[rowIndex][colIndex] !== 0
          const cellValue = cell === 0 ? '' : cell.toString()
          const isCorrect = isCellCorrect(rowIndex, colIndex)

          const borderClasses = `
            ${rowIndex % 3 === 0 ? 'border-t-2' : 'border-t'}
            ${colIndex % 3 === 0 ? 'border-l-2' : 'border-l'}
            ${rowIndex === 8 ? 'border-b-2' : 'border-b'}
            ${colIndex === 8 ? 'border-r-2' : 'border-r'}
          `

          return (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cellValue}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              maxLength={1}
              readOnly={isInitial}
              aria-label={`Sudoku cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
              title={`Sudoku cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
              placeholder={isInitial ? cellValue : ' '}
              className={`w-10 h-10 text-center ${borderClasses} ${
                isInitial
                  ? 'bg-gray-200 border-gray-400'
                  : cell === 0
                    ? 'border-gray-400'
                    : isCorrect === null
                      ? 'border-gray-400'
                      : isCorrect
                        ? 'border-green-500'
                        : 'border-red-500'
              }`}
            />
          )
        }),
      )}
    </div>
  )
}

export default SudokuBoard
