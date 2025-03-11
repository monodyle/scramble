import { GameModeProvider } from './mode'
import { ScoreProvider } from './score'
import { SettingsProvider } from './settings'
import { GameStateProvider } from './stage'
import { WordProvider } from './word'
import { WordListProvider } from './word-list'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <WordListProvider>
      <ScoreProvider>
        <GameStateProvider>
          <SettingsProvider>
            <WordProvider>
              <GameModeProvider>{children}</GameModeProvider>
            </WordProvider>
          </SettingsProvider>
        </GameStateProvider>
      </ScoreProvider>
    </WordListProvider>
  )
}
