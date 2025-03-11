import { GameModeProvider } from './mode'
import { SettingsProvider } from './settings'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <SettingsProvider>
      <GameModeProvider>{children}</GameModeProvider>
    </SettingsProvider>
  )
}
