import { useCallback } from 'react'
import {
  useResetGame,
  useSetDefaultSettings,
  useSetGameMode,
  useSetGameStage,
  type GameMode,
} from '../state/game'
import { useNextWord } from '../state/word'
import { useResetGuessState } from '../state/guess'

export function useStartGame() {
  const nextWord = useNextWord()
  const resetGame = useResetGame()
  const setGameMode = useSetGameMode()
  const resetGuessState = useResetGuessState()
  const setDefaultSettings = useSetDefaultSettings()
  const setGameStage = useSetGameStage()

  return useCallback(
    (mode: GameMode) => {
      resetGame()
      resetGuessState()
      setGameMode(mode)
      setDefaultSettings(mode)
      setGameStage('play')
      nextWord()
    },
    [
      resetGame,
      resetGuessState,
      nextWord,
      setDefaultSettings,
      setGameMode,
      setGameStage,
    ],
  )
}
