import { createContext, useContext, useState } from 'react'

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
