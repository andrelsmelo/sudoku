export interface SudokuBoardProps {
  board: number[][]
  initialBoard: number[][]
  handleInputChange: (row: number, col: number, value: string) => void
  isCellCorrect: (row: number, col: number) => boolean | null
  isRowCorrect: (row: number) => boolean
  isColCorrect: (col: number) => boolean
  isBlockCorrect: (row: number, col: number) => boolean
}
