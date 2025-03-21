import { useEffect } from 'react'
import useUpdateGuessInput from '../controls/update-guess-input'
import { useGuessState } from '../state/guess'
import { useInput } from '../state/input'
import { useWordState } from '../state/word'
import { useGameSetup } from '../state/game'

export default function Input() {
  const { word, scrambled } = useWordState()
  const { input, usedIndices } = useInput()
  const guessState = useGuessState()
  const { mode } = useGameSetup()
  const { update, backspace, popout } = useUpdateGuessInput()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (guessState === 'correct') return

      if (e.key === 'Backspace') {
        backspace()
      } else if (/^[a-zA-Z]$/.test(e.key) && input.length < word.length) {
        const keyLower = e.key.toLowerCase()
        const availableIndex = scrambled
          .split('')
          .findIndex(
            (char, index) =>
              char.toLowerCase() === keyLower && !usedIndices.includes(index),
          )

        if (availableIndex !== -1) {
          update(scrambled[availableIndex], availableIndex)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [
    backspace,
    input.length,
    scrambled,
    update,
    usedIndices,
    word.length,
    guessState,
  ])

  const showAnswer = guessState === 'incorrect' && mode !== 'chill'

  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: word.length }).map((_, index) => (
        <button
          key={index}
          onClick={() => popout(index)}
          type="button"
          disabled={guessState !== 'idle' || index >= input.length}
          className={[
            'text-xl size-12 rounded-lg font-semibold select-none flex items-center justify-center border-2',
            index === input.length
              ? 'border-violet bg-violet/5 text-violet'
              : index < input.length
                ? 'border-violet/20 bg-violet/5 text-violet cursor-pointer hover:bg-violet/10'
                : 'border-border bg-elevated',
            guessState === 'incorrect' &&
              'text-red border-red/20 bg-red/5 animate-[shake_200ms_ease-in-out_1_alternate]',
          ].join(' ')}
        >
          {showAnswer ? word[index] : input[index]}
        </button>
      ))}
    </div>
  )
}
