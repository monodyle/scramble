import { createContext, useCallback, useContext, useState } from 'react'

const ScoreContext = createContext<{
  score: number
  incrementScore: () => void
  resetScore: () => void
}>({
  score: 0,
  incrementScore: () => {},
  resetScore: () => {},
})

export function ScoreProvider({ children }: React.PropsWithChildren) {
  const [score, setScore] = useState(0)

  const incrementScore = useCallback(() => {
    setScore((score) => score + 1)
  }, [])

  const resetScore = useCallback(() => {
    setScore(0)
  }, [])

  return (
    <ScoreContext.Provider value={{ score, incrementScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  )
}

export function useScore() {
  const value = useContext(ScoreContext)
  return value
}

export function useIncrementScore() {
  const { incrementScore } = useScore()
  return incrementScore
}

export function useResetScore() {
  const { resetScore } = useScore()
  return resetScore
}
