'use client'

import React from 'react'

interface InfoModalProps {
  onClose: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">How to Play Sudoku</h2>
        <p className="mb-4">
          Sudoku is a logic-based, combinatorial number-placement puzzle. The
          objective is to fill a 9×9 grid with digits so that each column, each
          row, and each of the nine 3×3 subgrids that compose the grid contain
          all of the digits from 1 to 9.
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Each row must contain the numbers 1-9, without repetitions.</li>
          <li>
            Each column must contain the numbers 1-9, without repetitions.
          </li>
          <li>
            Each 3×3 subgrid must contain the numbers 1-9, without repetitions.
          </li>
        </ul>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default InfoModal
