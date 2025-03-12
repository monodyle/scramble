import { useCallback } from 'react'
import { useGameDispatch, useSettings } from '../state/game'

export default function useResetTimer() {
  const settings = useSettings()
  const dispatch = useGameDispatch()

  return useCallback(() => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { ...settings, time: 10 } })
  }, [dispatch, settings])
}
