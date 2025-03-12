import { useCallback } from 'react'
import { useGameDispatch, type GameMode } from '../state/game'
import { useRandomizeWord } from '../state/word'

export default function useStartGame() {
  const dispatch = useGameDispatch()
  const randomizeWord = useRandomizeWord()

  return useCallback(
    (mode: GameMode) => {
      dispatch({ type: 'SET_MODE', payload: mode })

      if (mode === 'chill') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: {
            strikes: Number.POSITIVE_INFINITY,
            time: Number.POSITIVE_INFINITY,
          },
        })
      } else if (mode === 'strike') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 3, time: Number.POSITIVE_INFINITY },
        })
      } else if (mode === 'rush') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 3, time: 10 },
        })
      } else if (mode === 'sprint') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 1, time: 60 },
        })
      }

      dispatch({ type: 'RESET_SCORE' })
      dispatch({ type: 'SET_STAGE', payload: 'play' })

      randomizeWord()
    },
    [dispatch, randomizeWord],
  )
}
