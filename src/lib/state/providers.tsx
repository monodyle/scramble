import { DictionaryProvider } from './dictionary'
import { GuessStateProvider } from './guess'
import { InputProvider } from './input'
import { WordProvider } from './word'
import { GameStateProvider } from './game'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <GameStateProvider>
      <DictionaryProvider>
        <WordProvider>
          <GuessStateProvider>
            <InputProvider>{children}</InputProvider>
          </GuessStateProvider>
        </WordProvider>
      </DictionaryProvider>
    </GameStateProvider>
  )
}
