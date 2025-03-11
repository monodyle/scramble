import { createContext, useContext, useState } from "react"

export type GuessState = 'idle' | 'correct' | 'incorrect'

const GuessStateContext = createContext<GuessState>('idle')
const GuessStateContextSetter = createContext<(state: GuessState) => void>(() => {})

export function GuessStateProvider({ children }: React.PropsWithChildren) {
  const [guessState, setGuessState] = useState<GuessState>('idle')

  return (
    <GuessStateContext.Provider value={guessState}>
      <GuessStateContextSetter.Provider value={setGuessState}>
        {children}
      </GuessStateContextSetter.Provider>
    </GuessStateContext.Provider>
  )
}

export function useGuessState() {
  return useContext(GuessStateContext)
}

export function useSetGuessState() {
  return useContext(GuessStateContextSetter)
}
