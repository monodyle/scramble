import { useCallback } from 'react'
import { useGameDispatch } from '../state/game'

export default function useBackToTitle() {
  const dispatch = useGameDispatch()

  return useCallback(() => {
    dispatch({ type: 'SET_STAGE', payload: 'title' })
  }, [dispatch])
}
