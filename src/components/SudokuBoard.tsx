'use client'

import React from 'react'

interface SudokuBoardProps {
  board: number[][]
  initialBoard: number[][]
  handleInputChange: (row: number, col: number, value: string) => void
  isCellCorrect: (row: number, col: number) => boolean | null
  isRowCorrect: (row: number) => boolean
  isColCorrect: (col: number) => boolean
  isBlockCorrect: (row: number, col: number) => boolean
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  initialBoard,
  handleInputChange,
  isCellCorrect,
  isRowCorrect,
  isColCorrect,
  isBlockCorrect,
}) => {
  return (
    <div className="grid grid-cols-9 gap-1 sm:gap-2">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isInitial = initialBoard[rowIndex][colIndex] !== 0
          const cellValue = cell === 0 ? '' : cell.toString()
          const isCorrect = isCellCorrect(rowIndex, colIndex)

          const borderClasses = `
            ${rowIndex % 3 === 0 ? 'border-t-2 sm:border-t-4' : 'border-t'}
            ${colIndex % 3 === 0 ? 'border-l-2 sm:border-l-4' : 'border-l'}
            ${rowIndex === 8 ? 'border-b-2 sm:border-b-4' : 'border-b'}
            ${colIndex === 8 ? 'border-r-2 sm:border-r-4' : 'border-r'}
          `

          const rowClass = isRowCorrect(rowIndex) ? 'border-green-500' : ''
          const colClass = isColCorrect(colIndex) ? 'border-green-500' : ''
          const blockClass = isBlockCorrect(rowIndex, colIndex)
            ? 'border-green-500'
            : ''

          return (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cellValue}
              onChange={(e) => {
                handleInputChange(rowIndex, colIndex, e.target.value)
                if (e.target.value !== '') {
                  e.target.blur()
                }
              }}
              maxLength={1}
              readOnly={isInitial}
              aria-label={`Sudoku cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
              title={`Sudoku cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
              placeholder={isInitial ? cellValue : ' '}
              className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-center ${borderClasses} ${rowClass} ${colClass} ${blockClass} ${
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
