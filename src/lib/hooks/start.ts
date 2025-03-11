import { useCallback } from 'react'
import { useSetGameState } from '../state/stage'
import { useSetDefaultSettings } from '../state/settings'
import { type GameMode, useSetGameMode } from '../state/mode'
import { useRandomizeWord } from '../state/word'
import { useSetScore } from '../state/score'

export function useStart() {
  const setGameMode = useSetGameMode()
  const setGameState = useSetGameState()
  const setDefaultSettings = useSetDefaultSettings()
  const randomizeWord = useRandomizeWord()
  const setScore = useSetScore()

  return useCallback(
    (mode: GameMode) => {
      setGameMode(mode)
      setDefaultSettings(mode)
      randomizeWord()
      setScore(0)
      setGameState('play')
    },
    [setGameMode, setDefaultSettings, randomizeWord, setScore, setGameState],
  )
}
