import { useScore } from '../state/game'

export default function Score() {
  const score = useScore()

  return <div className="font-serif font-medium">Score: {score}</div>
}
