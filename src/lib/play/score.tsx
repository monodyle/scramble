import { useScore } from '../state/score'

export default function Score() {
  const { score } = useScore()

  return <div className="font-serif font-medium">Score: {score}</div>
}
