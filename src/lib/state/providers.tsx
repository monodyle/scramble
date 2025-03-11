import { GuessStateProvider } from './guess'
import { InputProvider } from './input'
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
              <GameModeProvider>
                <GuessStateProvider>
                  <InputProvider>{children}</InputProvider>
                </GuessStateProvider>
              </GameModeProvider>
            </WordProvider>
          </SettingsProvider>
        </GameStateProvider>
      </ScoreProvider>
    </WordListProvider>
  )
}
