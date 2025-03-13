import { useCallback } from 'react'
import { useGuessState } from '../state/guess'
import { useInput, useSetInput, useSetUsedIndices } from '../state/input'
import { useWordState } from '../state/word'
import useSubmitGuessInput from './submit-guess-input'

export default function useUpdateGuessInput() {
  const { word, scrambled } = useWordState()
  const { input, usedIndices } = useInput()
  const setInput = useSetInput()
  const setUsedIndices = useSetUsedIndices()
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

  const popout = useCallback(
    (index: number) => {
      if (guessState === 'idle' && input.length > index) {
        const charToRemove = input[index]

        const scrambledIndex = scrambled
          .split('')
          .findIndex(
            (char, idx) => char === charToRemove && usedIndices.includes(idx),
          )

        if (scrambledIndex !== -1) {
          const newInput = input.slice(0, index) + input.slice(index + 1)
          const newUsedIndices = usedIndices.filter(
            (idx) => idx !== scrambledIndex,
          )
          setInput(newInput)
          setUsedIndices(newUsedIndices)
        }
      }
    },
    [guessState, input, usedIndices, setInput, setUsedIndices, scrambled],
  )

  const clear = useCallback(() => {
    if (guessState === 'idle') {
      setInput('')
      setUsedIndices([])
    }
  }, [guessState, setInput, setUsedIndices])

  const backspace = useCallback(() => {
    if (guessState === 'idle' && input.length > 0) {
      setInput(input.slice(0, -1))
      setUsedIndices(usedIndices.slice(0, -1))
    }
  }, [guessState, input, usedIndices, setInput, setUsedIndices])

  return {
    update,
    popout,
    backspace,
    clear,
  }
}
