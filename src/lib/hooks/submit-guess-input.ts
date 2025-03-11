import { useCallback } from 'react'
import { useSetGuessState } from '../state/guess'
import { useGameMode } from '../state/mode'
import { useSetScore } from '../state/score'
import { useWord } from '../state/word'
import useNextWord from './next-word'
import useResetGuessInput from './reset-guess-input'
import { useSetSettings, useSettings } from '../state/settings'
import { useSetGameState } from '../state/stage'

export default function useSubmitGuessInput() {
  const { word } = useWord()
  const resetGuessInput = useResetGuessInput()
  const setGuessState = useSetGuessState()
  const nextWord = useNextWord()
  const setScore = useSetScore()
  const gameMode = useGameMode()
  const { strikes } = useSettings()
  const setSettings = useSetSettings()
  const setGameState = useSetGameState()

  const correct = useCallback(() => {
    setGuessState('correct')
    setTimeout(() => {
      setScore((prev) => prev + 1)
      if (gameMode === 'rush') {
        setSettings((prev) => ({ ...prev, time: 10 }))
      }
      nextWord()
    }, 1000)
  }, [setGuessState, setScore, gameMode, nextWord, setSettings])

  const incorrect = useCallback(() => {
    setGuessState('incorrect')
    setTimeout(() => {
      resetGuessInput()
      if (gameMode !== 'chill') {
        const newStrikes = strikes - 1
        if (newStrikes === 0) {
          setGameState('over')
        } else {
          setSettings((prev) => ({ ...prev, strikes: newStrikes }))
        }
      }
    }, 1000)
  }, [
    setGuessState,
    resetGuessInput,
    gameMode,
    setGameState,
    strikes,
    setSettings,
  ])

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
