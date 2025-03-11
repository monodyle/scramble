import { createContext, useContext, useState } from 'react'

const ScoreGetter = createContext<number>(0)
const ScoreSetter = createContext<React.Dispatch<React.SetStateAction<number>>>(
  () => {},
)

export function ScoreProvider({ children }: React.PropsWithChildren) {
  const [score, setScore] = useState(0)

  return (
    <ScoreGetter.Provider value={score}>
      <ScoreSetter.Provider value={setScore}>{children}</ScoreSetter.Provider>
    </ScoreGetter.Provider>
  )
}

export function useScore() {
  return useContext(ScoreGetter)
}

export function useSetScore() {
  return useContext(ScoreSetter)
}
