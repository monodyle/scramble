import { useCallback } from 'react'
import { useRandomizeWord } from '../state/word'
import useResetGuessInput from './reset-guess-input'

export default function useNextWord() {
  const resetGuessInput = useResetGuessInput()
  const randomizeWord = useRandomizeWord()

  return useCallback(() => {
    resetGuessInput()
    randomizeWord()
  }, [randomizeWord, resetGuessInput])
}
