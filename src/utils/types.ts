import { ComponentPropsWithoutRef } from 'react'

export interface SudokuBoardProps {
  board: number[][]
  initialBoard: number[][]
  handleInputChange: (row: number, col: number, value: string) => void
  isCellCorrect: (row: number, col: number) => boolean | null
  isRowCorrect: (row: number) => boolean
  isColCorrect: (col: number) => boolean
  isBlockCorrect: (row: number, col: number) => boolean
}

export interface MessageProps {
  message: string
}

export interface DifficultyButtonsProps {
  difficulty: 'easy' | 'medium' | 'hard' | 'insane'
  resetGame: (difficulty: 'easy' | 'medium' | 'hard' | 'insane') => void
}

export type SVGProps = ComponentPropsWithoutRef<'svg'>
