import type { GameMode } from './mode'

export function getHighestScore(mode: GameMode) {
  const savedHighestScore = localStorage.getItem(`high_score_${mode}`)
  return savedHighestScore ? Number.parseInt(savedHighestScore) : 0
}

export function setHighestScore(mode: GameMode, score: number) {
  localStorage.setItem(`high_score_${mode}`, score.toString())
}
