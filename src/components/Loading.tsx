'use client'

import React from 'react'

const Loading: React.FC = () => {
  const word = 'SUDOKU'
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500']

  return (
    <div className="flex items-center justify-center space-x-2">
      {word.split('').map((letter, index) => (
        <div
          key={index}
          className={`p-2 text-white ${colors[index % colors.length]} rounded-full animate-bounce-slow-${index}`}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}

export default Loading
