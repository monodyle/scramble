import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useDictionary } from './dictionary'

const WordGetter = createContext<{
  word: string
  scrambled: string
} | null>(null)
const WordSetter = createContext<((word: string) => void) | null>(null)

function scramble(word: string): string {
  if (word.length === 0) {
    return ''
  }

  const letters = word.split('')
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  const scrambled = letters.join('')
  return scrambled === word ? scramble(word) : scrambled
}

export function WordProvider({ children }: React.PropsWithChildren) {
  const [word, setWord] = useState('hello')
  const scrambled = useMemo(() => scramble(word), [word])

  // DEBUG
  useEffect(() => {
    console.debug('original word', word)
  }, [word])

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
  const { list } = useDictionary()
  const setWord = useSetWord()

  return useCallback(() => {
    if (!list.length) {
      return
    }
    const randomIndex = Math.floor(Math.random() * list.length)
    setWord(list[randomIndex])
  }, [list, setWord])
}
