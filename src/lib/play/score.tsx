import { useEffect } from 'react'
import { useScore } from '../state/score'
import { useGameSetup } from '../state/game'
import { getHighestScore, setHighestScore } from '../highest-score'

export default function Score() {
  const { mode } = useGameSetup()
  const score = useScore()

  useEffect(() => {
    if (score > getHighestScore(mode)) {
      setHighestScore(mode, score)
    }
  }, [score, mode])

  return <div className="font-serif font-medium">Score: {score}</div>
}
