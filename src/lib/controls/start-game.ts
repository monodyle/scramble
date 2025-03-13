import { useCallback } from 'react'
import {
  useGameDispatch,
  useSetDefaultSettings,
  type GameMode,
} from '../state/game'
import { useNextWord } from '../state/word'
import { useInputDispatch } from '../state/input'
import { useGuessDispatch } from '../state/guess'

export function useStartGame() {
  const gameDispatch = useGameDispatch()
  const setDefaultSettings = useSetDefaultSettings()
  const inputDispatch = useInputDispatch()
  const guessDispatch = useGuessDispatch()
  const nextWord = useNextWord()

  return useCallback(
    (mode: GameMode) => {
      gameDispatch({ type: 'RESET_GAME' })
      inputDispatch({ type: 'RESET_INPUT' })
      guessDispatch({ type: 'RESET_GUESS' })

      gameDispatch({ type: 'SET_MODE', payload: mode })

      setDefaultSettings(mode)

      // Start the game
      gameDispatch({ type: 'SET_STAGE', payload: 'play' })
      nextWord()
    },
    [
      gameDispatch,
      inputDispatch,
      guessDispatch,
      nextWord,
      setDefaultSettings,
    ],
  )
}
