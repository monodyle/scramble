import { useCallback } from 'react'
import { useSetGameState } from '../state/stage'
import { useSetDefaultSettings } from '../state/settings'
import { type GameMode, useSetGameMode } from '../state/mode'
import { useRandomizeWord } from '../state/word'

export function useStart() {
  const setGameMode = useSetGameMode()
  const setGameState = useSetGameState()
  const setDefaultSettings = useSetDefaultSettings()
  const randomizeWord = useRandomizeWord()

  return useCallback(
    (mode: GameMode) => {
      setGameMode(mode)
      setDefaultSettings(mode)
      randomizeWord()
      setGameState('play')
    },
    [setGameMode, setDefaultSettings, randomizeWord, setGameState],
  )
}
