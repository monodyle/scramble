import { useCallback } from 'react'
import { useSetGuessState } from '../state/guess'
import { useGameMode } from '../state/mode'
import { useSetScore } from '../state/score'
import { useWord } from '../state/word'
import useNextWord from './next-word'
import useResetGuessInput from './reset-guess-input'
import useResetTimer from './reset-timer'
import useStrike from './strike'

export default function useSubmitGuessInput() {
  const { word } = useWord()
  const resetGuessInput = useResetGuessInput()
  const setGuessState = useSetGuessState()
  const nextWord = useNextWord()
  const setScore = useSetScore()
  const gameMode = useGameMode()
  const strike = useStrike()
  const resetTimer = useResetTimer()

  const correct = useCallback(() => {
    setGuessState('correct')
    setTimeout(() => {
      setScore((prev) => prev + 1)
      if (gameMode === 'rush') {
        resetTimer()
      }
      nextWord()
    }, 1000)
  }, [setGuessState, setScore, gameMode, nextWord, resetTimer])

  const incorrect = useCallback(() => {
    setGuessState('incorrect')
    setTimeout(() => {
      resetGuessInput()
      if (gameMode !== 'chill') {
        const left = strike()
        if (left > 0 && gameMode === 'rush') {
          resetTimer()
        }
        nextWord()
      }
    }, 1000)
  }, [setGuessState, resetGuessInput, gameMode, strike, resetTimer, nextWord])

  return useCallback(
    (value: string) => {
      if (value.toLowerCase() === word.toLowerCase()) {
        correct()
      } else {
        incorrect()
      }
    },
    [correct, incorrect, word],
  )
}
