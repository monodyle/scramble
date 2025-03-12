import { useCallback } from 'react'
import { useGameDispatch } from '../state/game'

export default function useResetTimer() {
  const dispatch = useGameDispatch()

  return useCallback(() => {
    dispatch({ type: 'SET_TIME', payload: 10 })
  }, [dispatch])
}
