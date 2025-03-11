import { useCallback } from 'react'
import { useSetSettings } from '../state/settings'

export default function useResetTimer() {
  const setSettings = useSetSettings()

  return useCallback(() => {
    setSettings((prev) => ({ ...prev, time: 10 }))
  }, [setSettings])
}
