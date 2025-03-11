import { createContext, useCallback, useContext, useState } from 'react'
import { useSetSettings } from './settings'

type GameMode = 'chill' | 'strike' | 'rush' | 'sprint' | null

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

export function useSelectGameMode() {
  const setter = useContext(GameModeSetter)
  const setSettings = useSetSettings()

  const selectMode = useCallback(
    (mode: GameMode) => {
      setter(mode)
      if (mode === 'chill') {
        setSettings({
          strikes: Number.POSITIVE_INFINITY,
          time: Number.POSITIVE_INFINITY,
        })
      } else if (mode === 'strike') {
        setSettings({ strikes: 3, time: Number.POSITIVE_INFINITY })
      } else if (mode === 'rush') {
        setSettings({ strikes: 3, time: 10 })
      } else if (mode === 'sprint') {
        setSettings({ strikes: 1, time: 60 })
      }
    },
    [setter, setSettings],
  )

  return selectMode
}
