export const generateFullBoard = (): number[][] => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0))

  const fillBoard = (board: number[][]) => {
    const findEmpty = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) return { row, col }
        }
      }
      return null
    }

    const isValid = (num: number, pos: { row: number; col: number }) => {
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

    const solve = () => {
      const empty = findEmpty()
      if (!empty) return true

      const { row, col } = empty
      for (let num = 1; num <= 9; num++) {
        if (isValid(num, { row, col })) {
          board[row][col] = num
          if (solve()) return true
          board[row][col] = 0
        }
      }
      return false
    }

    solve()
  }

  fillBoard(board)
  return board
}

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const shuffleBoard = (board: number[][]) => {
  const newBoard = board.map((row) => row.slice())

  const shuffleRowsWithinGroups = () => {
    for (let group = 0; group < 9; group += 3) {
      const rows = [group, group + 1, group + 2]
      shuffleArray(rows)
      for (let i = 0; i < 3; i++) {
        newBoard[group + i] = board[rows[i]]
      }
    }
  }

  const shuffleColsWithinGroups = () => {
    for (let group = 0; group < 9; group += 3) {
      const cols = [group, group + 1, group + 2]
      shuffleArray(cols)
      for (let row = 0; row < 9; row++) {
        const tempRow = newBoard[row].slice()
        for (let i = 0; i < 3; i++) {
          newBoard[row][group + i] = tempRow[cols[i]]
        }
      }
    }
  }

  shuffleRowsWithinGroups()
  shuffleColsWithinGroups()
  return newBoard
}

export const removeNumbers = (board: number[][], count: number): number[][] => {
  const newBoard = board.map((row) => row.slice())
  let attempts = count
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (newBoard[row][col] !== 0) {
      newBoard[row][col] = 0
      attempts--
    }
  }
  return newBoard
}

export const generateInitialBoard = (
  difficulty: 'easy' | 'medium' | 'hard' | 'insane' = 'medium',
): number[][] => {
  const fullBoard = generateFullBoard()
  const randomizedBoard = shuffleBoard(fullBoard)
  const numberOfCellsToRemove =
    difficulty === 'easy'
      ? 1
      : difficulty === 'medium'
        ? 40
        : difficulty === 'hard'
          ? 50
          : 70
  return removeNumbers(randomizedBoard, numberOfCellsToRemove)
}

export const isBoardValid = (board: number[][]): boolean => {
  const validateArray = (arr: number[]) => {
    const filtered = arr.filter((num) => num !== 0)
    return new Set(filtered).size === filtered.length
  }

  for (let i = 0; i < 9; i++) {
    if (!validateArray(board[i])) return false

    const col = board.map((row) => row[i])
    if (!validateArray(col)) return false

    const subGrid = []
    for (let j = 0; j < 9; j++) {
      subGrid.push(
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][(i % 3) * 3 + (j % 3)],
      )
    }
    if (!validateArray(subGrid)) return false
  }

  return true
}
