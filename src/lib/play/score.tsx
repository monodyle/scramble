import { useScore } from '../state/score'

export default function Score() {
  const { current } = useScore()

  return <div className="font-serif font-medium">Score: {current}</div>
}
