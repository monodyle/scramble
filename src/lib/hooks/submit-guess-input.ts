import { useCallback } from 'react'
import { useSound } from '../sound'
import { useSetGuessState } from '../state/guess'
import { useGameDispatch, useGameMode } from '../state/game'
import { useWord } from '../state/word'
import { useDictionary } from '../state/dictionary'
import useNextWord from './next-word'
import useResetGuessInput from './reset-guess-input'
import useResetTimer from './reset-timer'
import useStrike from './strike'

function getLetterFrequency(word: string): Map<string, number> {
  const freq = new Map<string, number>()
  for (const char of word.toLowerCase()) {
    freq.set(char, (freq.get(char) || 0) + 1)
  }
  return freq
}

function canFormSameLetters(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false

  const freq1 = getLetterFrequency(word1)
  const freq2 = getLetterFrequency(word2)

  if (freq1.size !== freq2.size) return false

  for (const [char, count] of freq1) {
    if (freq2.get(char) !== count) return false
  }

  return true
}

export default function useSubmitGuessInput() {
  const { word } = useWord()
  const { set } = useDictionary()
  const resetGuessInput = useResetGuessInput()
  const setGuessState = useSetGuessState()
  const dispatch = useGameDispatch()
  const nextWord = useNextWord()
  const gameMode = useGameMode()
  const strike = useStrike()
  const resetTimer = useResetTimer()
  const { play } = useSound()

  const correct = useCallback(() => {
    setGuessState('correct')
    play('correct')
    setTimeout(() => {
      dispatch({ type: 'INCREMENT_SCORE' })
      if (gameMode === 'rush') {
        resetTimer()
      }
      nextWord()
    }, 1000)
  }, [setGuessState, gameMode, nextWord, resetTimer, play, dispatch])

  const incorrect = useCallback(() => {
    play('incorrect')
    setGuessState('incorrect')
    resetGuessInput()
    const left = strike()
    if (left > 0 && gameMode === 'rush') {
      resetTimer()
    }
    setTimeout(() => {
      if (gameMode !== 'chill') {
        nextWord()
      }
    }, 1000)
  }, [
    setGuessState,
    resetGuessInput,
    gameMode,
    strike,
    resetTimer,
    nextWord,
    play,
  ])

  return useCallback(
    (value: string) => {
      const normalizedInput = value.toLowerCase()
      const normalizedWord = word.toLowerCase()

      if (normalizedInput === normalizedWord) {
        correct()
        return
      }

      if (
        canFormSameLetters(normalizedInput, normalizedWord) &&
        set.has(normalizedInput)
      ) {
        correct()
        return
      }

      incorrect()
    },
    [correct, incorrect, word, set],
  )
}
