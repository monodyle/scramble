import { DictionaryProvider } from './dictionary'
import { GuessStateProvider } from './guess'
import { InputProvider } from './input'
import { WordProvider } from './word'
import { GameStateProvider } from './game'
import { ScoreProvider } from './score'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ScoreProvider>
      <GameStateProvider>
        <DictionaryProvider>
          <WordProvider>
            <GuessStateProvider>
              <InputProvider>{children}</InputProvider>
            </GuessStateProvider>
          </WordProvider>
        </DictionaryProvider>
      </GameStateProvider>
    </ScoreProvider>
  )
}
