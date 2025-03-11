import useUpdateGuessInput from '../hooks/update-guess-input'
import { useGuessState } from '../state/guess'
import { useInput } from '../state/input'
import { useWord } from '../state/word'

export default function Scrambled() {
  const { scrambled } = useWord()
  const { update } = useUpdateGuessInput()
  const { usedIndices } = useInput()
  const guessState = useGuessState()

  return (
    <div className="flex items-center justify-center gap-1">
      {scrambled.split('').map((char, index) => (
        <button
          type="button"
          key={index}
          onClick={() => update(char, index)}
          disabled={
            guessState === 'correct' ||
            guessState === 'incorrect' ||
            usedIndices.includes(index)
          }
          aria-label={`Select letter ${char}`}
          className={[
            'text-xl size-12 rounded-lg font-semibold select-none flex items-center justify-center cursor-pointer transition-all disabled:cursor-default',
            usedIndices.includes(index)
              ? 'opacity-0 scale-75'
              : guessState === 'correct' || guessState === 'incorrect'
                ? 'opacity-50 pointer-events-none'
                : 'bg-violet/20 text-violet hover:bg-violet/30 focus:ring-2 focus:ring-violet focus:outline-none',
          ].join(' ')}
        >
          {char}
        </button>
      ))}
    </div>
  )
}
