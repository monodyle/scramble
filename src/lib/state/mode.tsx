import { createContext, useContext, useState } from 'react'

type GameMode = 'chill' | 'strike' | 'rush' | 'sprint' | null

const GameModeGetter = createContext<GameMode>(null)
const GameModeSetter = createContext<((mode: GameMode) => void) | null>(null)

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

export function useSelectGameMode() {
  const setter = useContext(GameModeSetter)
  if (!setter) {
    throw new Error('useSetGameMode must be used within a GameModeProvider')
  }
  return setter
}
