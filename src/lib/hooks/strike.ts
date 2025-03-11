import { useCallback } from 'react'
import { useSetSettings, useSettings } from '../state/settings'
import { useSetGameState } from '../state/stage'

export default function useStrike() {
  const { strikes } = useSettings()
  const setSettings = useSetSettings()
  const setGameState = useSetGameState()

  return useCallback(() => {
    const newStrikes = strikes - 1
    if (newStrikes === 0) {
      setGameState('over')
    } else {
      setSettings((prev) => ({ ...prev, strikes: newStrikes }))
    }

    return newStrikes
  }, [setGameState, setSettings, strikes])
}
