import { useCallback } from 'react'
import { useGuessState } from '../state/guess'
import { useInput, useInputActions } from '../state/input'
import { useWord } from '../state/word'
import useSubmitGuessInput from './submit-guess-input'

export default function useUpdateGuessInput() {
  const { word } = useWord()
  const { input, usedIndices } = useInput()
  const { setInput, setUsedIndices } = useInputActions()
  const guessState = useGuessState()
  const submitGuessInput = useSubmitGuessInput()

  const update = useCallback(
    (value: string, index: number) => {
      if (
        guessState === 'idle' &&
        input.length <= word.length &&
        !usedIndices.includes(index)
      ) {
        const newValue = input + value
        setInput(newValue)
        setUsedIndices([...usedIndices, index])
        if (newValue.length === word.length) {
          submitGuessInput(newValue)
        }
      }
    },
    [
      guessState,
      input,
      word.length,
      usedIndices,
      setInput,
      setUsedIndices,
      submitGuessInput,
    ],
  )

  const backspace = useCallback(() => {
    if (guessState === 'idle' && input.length > 0) {
      setInput(input.slice(0, -1))
      setUsedIndices(usedIndices.slice(0, -1))
    }
  }, [guessState, input, usedIndices, setInput, setUsedIndices])

  return {
    update,
    backspace,
  }
}
