import { useNextWord } from '../state/word'
import { useGameMode } from '../state/game'

export default function Options() {
  const gameMode = useGameMode()
  const nextWord = useNextWord()

  if (gameMode !== 'chill') {
    return null
  }

  return (
    <div className="mt-auto flex items-center justify-center gap-2">
      <button
        type="button"
        className="px-4 py-1.5 font-serif font-semibold transition-colors transform rounded-lg text-primary bg-primary/4 hover:bg-primary/8"
        onClick={() => nextWord()}
      >
        Skip
      </button>
    </div>
  )
}
