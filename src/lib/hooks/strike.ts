import { useCallback } from 'react'
import { useSettings, useGameDispatch } from '../state/game'

export default function useStrike() {
  const settings = useSettings()
  const dispatch = useGameDispatch()

  return useCallback(() => {
    const newStrikes = settings.strikes - 1
    if (newStrikes === 0) {
      dispatch({ type: 'SET_STAGE', payload: 'over' })
    } else {
      dispatch({
        type: 'UPDATE_SETTINGS',
        payload: { ...settings, strikes: newStrikes },
      })
    }

    return newStrikes
  }, [dispatch, settings])
}
