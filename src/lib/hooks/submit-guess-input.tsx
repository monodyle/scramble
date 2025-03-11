import { useCallback } from 'react'
import { useSetGuessState } from '../state/guess'
import { useWord } from '../state/word'
import useNextWord from './next-word'
import useResetGuessInput from './reset-guess-input'
import { useSetScore } from '../state/score'

export default function useSubmitGuessInput() {
  const { word } = useWord()
  const resetGuessInput = useResetGuessInput()
  const setGuessState = useSetGuessState()
  const nextWord = useNextWord()
  const setScore = useSetScore()

  return useCallback(
    (value: string, autoContinue = false) => {
      if (value.toLowerCase() === word.toLowerCase()) {
        setGuessState('correct')
        if (autoContinue) {
          setTimeout(() => {
            setScore((prev) => prev + 1)
            nextWord()
          }, 1000)
        }
      } else {
        setGuessState('incorrect')
        if (autoContinue) {
          setTimeout(() => {
            resetGuessInput()
          }, 1000)
        }
      }
    },
    [word, setGuessState, nextWord, resetGuessInput, setScore],
  )
}
