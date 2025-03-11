import { useCallback } from 'react'
import { useSetGameState } from '../state/stage'

export function useBack() {
  const setGameState = useSetGameState()

  return useCallback(() => {
    setGameState('title')
  }, [setGameState])
}
