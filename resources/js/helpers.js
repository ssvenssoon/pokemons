export const calculateNewHealth = (currentHealth, power) => {
  return Math.max(currentHealth - power / 2, 0)
}

export const getOppositionRandomMove = (moves) => {
  const randomIndex = Math.floor(Math.random() * moves.length)
  return moves[randomIndex]
}

export const getShuffledMoves = (moves) => {
  return moves.sort(() => 0.5 - Math.random())
}
