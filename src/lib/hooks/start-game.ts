import { useCallback } from 'react'
import {
  useGameDispatch,
  useSetDefaultSettings,
  type GameMode,
} from '../state/game'
import { useRandomizeWord } from '../state/word'
import { useInputDispatch } from '../state/input'
import { useGuessDispatch } from '../state/guess'

export default function useStartGame() {
  const gameDispatch = useGameDispatch()
  const setDefaultSettings = useSetDefaultSettings()
  const inputDispatch = useInputDispatch()
  const guessDispatch = useGuessDispatch()
  const randomizeWord = useRandomizeWord()

  return useCallback(
    (mode: GameMode) => {
      gameDispatch({ type: 'RESET_GAME' })
      inputDispatch({ type: 'RESET_INPUT' })
      guessDispatch({ type: 'RESET_GUESS' })

      gameDispatch({ type: 'SET_MODE', payload: mode })

      setDefaultSettings(mode)

      // Start the game
      gameDispatch({ type: 'SET_STAGE', payload: 'play' })
      randomizeWord()
    },
    [
      gameDispatch,
      inputDispatch,
      guessDispatch,
      randomizeWord,
      setDefaultSettings,
    ],
  )
}
