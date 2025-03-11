import { createContext, useContext, useState } from 'react'

type GameState = 'title' | 'play' | 'pause' | 'over'

const GameStateGetter = createContext<GameState>('title')
const GameStateSetter = createContext<
  React.Dispatch<React.SetStateAction<GameState>>
>(() => {})

export function GameStateProvider({ children }: React.PropsWithChildren) {
  const [gameState, setGameState] = useState<GameState>('title')

  return (
    <GameStateGetter.Provider value={gameState}>
      <GameStateSetter.Provider value={setGameState}>
        {children}
      </GameStateSetter.Provider>
    </GameStateGetter.Provider>
  )
}

export function useGameState() {
  return useContext(GameStateGetter)
}

export function useSetGameState() {
  return useContext(GameStateSetter)
}
