import { createContext, useCallback, useContext, useState } from 'react'

const ScoreContext = createContext<{
  current: number
  highest: number
  incrementScore: () => void
  resetScore: () => void
}>({
  current: 0,
  highest: 0,
  incrementScore: () => {},
  resetScore: () => {},
})

export function ScoreProvider({ children }: React.PropsWithChildren) {
  const [score, setScore] = useState(0)
  const [highest, setHighest] = useState(() => {
    const savedHighestScore = localStorage.getItem('highestScore')
    return savedHighestScore ? Number.parseInt(savedHighestScore, 10) : 0
  })

  const incrementScore = useCallback(() => {
    setScore((prevScore) => {
      const newScore = prevScore + 1
      if (newScore > highest) {
        setHighest(newScore)
        localStorage.setItem('highestScore', newScore.toString())
      }
      return newScore
    })
  }, [highest])

  const resetScore = useCallback(() => {
    setScore(0)
  }, [])

  return (
    <ScoreContext.Provider
      value={{ current: score, highest, incrementScore, resetScore }}
    >
      {children}
    </ScoreContext.Provider>
  )
}

export function useScore() {
  const { current, highest } = useContext(ScoreContext)
  return { current, highest }
}

export function useIncrementScore() {
  const { incrementScore } = useContext(ScoreContext)
  return incrementScore
}

export function useResetScore() {
  const { resetScore } = useContext(ScoreContext)
  return resetScore
}
