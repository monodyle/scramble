import { useNextWord } from '../state/word'
import { useGameSetup } from '../state/game'

export default function Options() {
  const { mode } = useGameSetup()
  const nextWord = useNextWord()

  if (mode !== 'chill') {
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
