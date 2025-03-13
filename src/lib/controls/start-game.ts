import { useCallback } from 'react'
import {
  useResetGame,
  useSetDefaultSettings,
  useSetGameMode,
  useSetGameStage,
  type GameMode,
} from '../state/game'
import { useNextWord } from '../state/word'
import { useGuessDispatch } from '../state/guess'

export function useStartGame() {
  const nextWord = useNextWord()
  const resetGame = useResetGame()
  const setGameMode = useSetGameMode()
  const guessDispatch = useGuessDispatch()
  const setDefaultSettings = useSetDefaultSettings()
  const setGameStage = useSetGameStage()

  return useCallback(
    (mode: GameMode) => {
      resetGame()
      guessDispatch({ type: 'RESET_GUESS' })

      setGameMode(mode)

      setDefaultSettings(mode)

      setGameStage('play')
      nextWord()
    },
    [
      resetGame,
      guessDispatch,
      nextWord,
      setDefaultSettings,
      setGameMode,
      setGameStage,
    ],
  )
}
