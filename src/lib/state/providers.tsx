import { GameModeProvider } from './mode'
import { SettingsProvider } from './settings'
import { GameStateProvider } from './stage'
import { WordProvider } from './word'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <GameStateProvider>
      <SettingsProvider>
        <WordProvider>
          <GameModeProvider>{children}</GameModeProvider>
        </WordProvider>
      </SettingsProvider>
    </GameStateProvider>
  )
}
