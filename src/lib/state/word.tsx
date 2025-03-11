import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useWordList } from './word-list'

const WordGetter = createContext<{
  word: string
  scrambled: string
} | null>(null)
const WordSetter = createContext<((word: string) => void) | null>(null)

function scrambleWord(word: string): string {
  if (word.length === 0) {
    return ''
  }

  const letters = word.split('')
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  const scrambled = letters.join('')
  return scrambled === word ? scrambleWord(word) : scrambled
}

export function WordProvider({ children }: React.PropsWithChildren) {
  const [word, setWord] = useState('hello')
  const scrambled = useMemo(() => scrambleWord(word), [word])

  return (
    <WordGetter.Provider value={{ word, scrambled }}>
      <WordSetter.Provider value={setWord}>{children}</WordSetter.Provider>
    </WordGetter.Provider>
  )
}

export function useWord() {
  const word = useContext(WordGetter)
  if (!word) {
    throw new Error('useWord must be used within a WordProvider')
  }

  return word
}

export function useSetWord() {
  const setWord = useContext(WordSetter)
  if (!setWord) {
    throw new Error('useSetWord must be used within a WordProvider')
  }

  return setWord
}

export function useRandomizeWord() {
  const wordList = useWordList()
  const setWord = useSetWord()

  return useCallback(() => {
    if (!wordList.length) {
      return
    }
    const randomIndex = Math.floor(Math.random() * wordList.length)
    setWord(wordList[randomIndex])
  }, [wordList, setWord])
}
