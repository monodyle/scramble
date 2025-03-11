import { GameModeProvider } from './mode'
import { SettingsProvider } from './settings'
import { GameStateProvider } from './stage'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <GameStateProvider>
      <SettingsProvider>
        <GameModeProvider>{children}</GameModeProvider>
      </SettingsProvider>
    </GameStateProvider>
  )
}
