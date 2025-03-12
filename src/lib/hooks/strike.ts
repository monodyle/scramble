import { useCallback } from 'react'
import { useStrikes, useGameDispatch } from '../state/game'

export default function useStrike() {
  const strikes = useStrikes()
  const dispatch = useGameDispatch()

  return useCallback(() => {
    const newStrikes = strikes - 1
    if (newStrikes === 0) {
      dispatch({ type: 'SET_STAGE', payload: 'over' })
    } else {
      dispatch({
        type: 'SET_STRIKES',
        payload: newStrikes,
      })
    }

    return newStrikes
  }, [dispatch, strikes])
}
