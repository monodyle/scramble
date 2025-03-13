import { useCallback } from 'react'
import { useSound } from '../sound'
import { useSetGuessState } from '../state/guess'
import {
  useGameSetup,
  useResetTimer,
  useSetGameStage,
  useStrike,
} from '../state/game'
import { useWordState } from '../state/word'
import { useDictionary } from '../state/dictionary'
import { useNextWord } from '../state/word'
import { useResetGuessInput } from '../state/input'
import { useIncrementScore } from '../state/score'

function getLetterFrequency(word: string): Map<string, number> {
  const freq = new Map<string, number>()
  for (const char of word.toLowerCase()) {
    freq.set(char, (freq.get(char) || 0) + 1)
  }
  return freq
}

function hasSameScramble(word1: string, word2: string): boolean {
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
  const { word } = useWordState()
  const { set } = useDictionary()
  const resetGuessInput = useResetGuessInput()
  const setGuessState = useSetGuessState()
  const nextWord = useNextWord()
  const { mode } = useGameSetup()
  const resetTimer = useResetTimer()
  const { play } = useSound()
  const strike = useStrike()
  const incrementScore = useIncrementScore()
  const setGameStage = useSetGameStage()

  const correct = useCallback(() => {
    setGuessState('correct')
    play('correct')
    setTimeout(() => {
      incrementScore()
      if (mode === 'rush') {
        resetTimer()
      }
      nextWord()
    }, 1000)
  }, [setGuessState, mode, nextWord, resetTimer, play, incrementScore])

  const incorrect = useCallback(() => {
    play('incorrect')
    setGuessState('incorrect')
    const timeout = mode === 'chill' || mode === 'rush' ? 1000 : 2000
    setTimeout(() => {
      const left = strike()
      if (left === 0) {
        setGameStage('over')
      }
      if (left > 0 && mode === 'rush') {
        resetTimer()
      }
      if (mode !== 'chill') {
        nextWord()
      }
      resetGuessInput()
    }, timeout)
  }, [
    setGuessState,
    resetGuessInput,
    mode,
    strike,
    resetTimer,
    nextWord,
    play,
    setGameStage,
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
        hasSameScramble(normalizedInput, normalizedWord) &&
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
