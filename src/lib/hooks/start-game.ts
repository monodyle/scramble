import { useCallback } from 'react'
import { useGameDispatch, type GameMode } from '../state/game'
import { useRandomizeWord } from '../state/word'
import { useInputDispatch } from '../state/input'
import { useGuessDispatch } from '../state/guess'

export default function useStartGame() {
  const gameDispatch = useGameDispatch()
  const inputDispatch = useInputDispatch()
  const guessDispatch = useGuessDispatch()
  const randomizeWord = useRandomizeWord()

  return useCallback(
    (mode: GameMode) => {
      // Reset all states
      gameDispatch({ type: 'RESET_GAME' })
      inputDispatch({ type: 'RESET_INPUT' })
      guessDispatch({ type: 'RESET_GUESS' })

      // Set up new game
      gameDispatch({ type: 'SET_MODE', payload: mode })

      // Configure settings based on mode
      if (mode === 'chill') {
        gameDispatch({
          type: 'UPDATE_SETTINGS',
          payload: {
            strikes: Number.POSITIVE_INFINITY,
            time: Number.POSITIVE_INFINITY,
          },
        })
      } else if (mode === 'strike') {
        gameDispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 3, time: Number.POSITIVE_INFINITY },
        })
      } else if (mode === 'rush') {
        gameDispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 3, time: 10 },
        })
      } else if (mode === 'sprint') {
        gameDispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 1, time: 60 },
        })
      }

      // Start the game
      gameDispatch({ type: 'SET_STAGE', payload: 'play' })
      randomizeWord()
    },
    [gameDispatch, inputDispatch, guessDispatch, randomizeWord],
  )
}
