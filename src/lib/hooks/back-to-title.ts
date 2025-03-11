import { useCallback } from 'react'
import { useSetGameState } from '../state/stage'

export default function useBackToTitle() {
  const setGameState = useSetGameState()

  return useCallback(() => {
    setGameState('title')
  }, [setGameState])
}
