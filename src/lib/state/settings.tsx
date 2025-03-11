import { createContext, useCallback, useContext, useState } from 'react'
import type { GameMode } from './mode'

type Settings = {
  strikes: number
  time: number
}

const SettingsGetter = createContext<Settings>({
  strikes: 3,
  time: 10,
})
const SettingsSetter = createContext<
  React.Dispatch<React.SetStateAction<Settings>>
>(() => {})

export function SettingsProvider({ children }: React.PropsWithChildren) {
  const [settings, setSettings] = useState<Settings>({ strikes: 3, time: 10 })

  return (
    <SettingsGetter.Provider value={settings}>
      <SettingsSetter.Provider value={setSettings}>
        {children}
      </SettingsSetter.Provider>
    </SettingsGetter.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsGetter)
}

export function useSetSettings() {
  return useContext(SettingsSetter)
}

export function useSetDefaultSettings() {
  const setSettings = useSetSettings()

  return useCallback(
    (mode: GameMode) => {
      if (mode === 'chill') {
        setSettings({
          strikes: Number.POSITIVE_INFINITY,
          time: Number.POSITIVE_INFINITY,
        })
      } else if (mode === 'strike') {
        setSettings({ strikes: 3, time: Number.POSITIVE_INFINITY })
      } else if (mode === 'rush') {
        setSettings({ strikes: 3, time: 10 })
      } else if (mode === 'sprint') {
        setSettings({ strikes: 1, time: 60 })
      }
    },
    [setSettings],
  )
}
