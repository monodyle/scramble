import { createContext, useContext, useState } from 'react'

export type GameMode = 'chill' | 'strike' | 'rush' | 'sprint' | null

const GameModeGetter = createContext<GameMode>(null)
const GameModeSetter = createContext<(mode: GameMode) => void>(() => {})

export function GameModeProvider({ children }: React.PropsWithChildren) {
  const [mode, setMode] = useState<GameMode>(null)

  return (
    <GameModeGetter.Provider value={mode}>
      <GameModeSetter.Provider value={setMode}>
        {children}
      </GameModeSetter.Provider>
    </GameModeGetter.Provider>
  )
}

export function useGameMode() {
  return useContext(GameModeGetter)
}

export function useSetGameMode() {
  return useContext(GameModeSetter)
}
