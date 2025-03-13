import { useCallback } from 'react'
import { useSound } from '../sound'
import { useSetGuessState } from '../state/guess'
import {
  useGameMode,
  useIncrementScore,
  useResetTimer,
  useStrike,
} from '../state/game'
import { useWordState } from '../state/word'
import { useDictionary } from '../state/dictionary'
import { useNextWord } from '../state/word'
import { useResetGuessInput } from '../state/input'

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
  const gameMode = useGameMode()
  const resetTimer = useResetTimer()
  const { play } = useSound()
  const strike = useStrike()
  const incrementScore = useIncrementScore()

  const correct = useCallback(() => {
    setGuessState('correct')
    play('correct')
    setTimeout(() => {
      incrementScore()
      if (gameMode === 'rush') {
        resetTimer()
      }
      nextWord()
    }, 1000)
  }, [setGuessState, gameMode, nextWord, resetTimer, play, incrementScore])

  const incorrect = useCallback(() => {
    play('incorrect')
    setGuessState('incorrect')
    const timeout = gameMode === 'chill' || gameMode === 'rush' ? 1000 : 2000
    setTimeout(() => {
      const left = strike()
      if (left > 0 && gameMode === 'rush') {
        resetTimer()
      }
      if (gameMode !== 'chill') {
        nextWord()
      }
      resetGuessInput()
    }, timeout)
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
