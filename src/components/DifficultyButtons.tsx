'use client'

import React from 'react'
import { DifficultyButtonsProps } from '@/utils/types'

const DifficultyButtons: React.FC<DifficultyButtonsProps> = ({
  difficulty,
  resetGame,
}) => {
  const difficulties = ['easy', 'medium', 'hard', 'insane'] as const
  return (
    <div className="flex flex-wrap mb-4 gap-2 sm:gap-4">
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => resetGame(level)}
          className={`${
            level === 'easy'
              ? 'bg-blue-300 dark:bg-blue-700'
              : level === 'medium'
                ? 'bg-green-300 dark:bg-green-700'
                : level === 'hard'
                  ? 'bg-red-300 dark:bg-red-700'
                  : 'bg-black text-white dark:bg-gray-700'
          } text-slate-900 dark:text-slate-100 hover:cursor-pointer hover:scale-110 px-4 py-2 transition-all ease-in-out rounded ${
            difficulty === level ? 'border border-black dark:border-white' : ''
          }`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default DifficultyButtons
