import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { useDictionary } from './dictionary'

interface WordState {
  word: string
  scrambled: string
}

type WordAction =
  | { type: 'SET_WORD'; payload: string }
  | { type: 'SCRAMBLE_WORD' }
  | { type: 'RESET_WORD' }

const initialState: WordState = {
  word: 'hello',
  scrambled: 'lehlo',
}

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

function wordReducer(state: WordState, action: WordAction): WordState {
  switch (action.type) {
    case 'SET_WORD':
      return {
        word: action.payload,
        scrambled: scramble(action.payload),
      }
    case 'SCRAMBLE_WORD':
      return {
        ...state,
        scrambled: scramble(state.word),
      }
    case 'RESET_WORD':
      return initialState
    default:
      return state
  }
}

const WordContext = createContext<{
  state: WordState
  dispatch: React.Dispatch<WordAction>
} | null>(null)

export function WordProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(wordReducer, initialState)

  // DEBUG
  useEffect(() => {
    console.debug('original word', state.word)
  }, [state.word])

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  )
}

export function useWordState() {
  const context = useContext(WordContext)
  if (!context) {
    throw new Error('useWordState must be used within a WordProvider')
  }
  return context.state
}

export function useWordDispatch() {
  const context = useContext(WordContext)
  if (!context) {
    throw new Error('useWordDispatch must be used within a WordProvider')
  }
  return context.dispatch
}

export function useWord() {
  const context = useContext(WordContext)
  if (!context) {
    throw new Error('useWord must be used within a WordProvider')
  }
  return context.state
}

export function useSetWord() {
  const dispatch = useWordDispatch()
  return useCallback(
    (word: string) => {
      dispatch({ type: 'SET_WORD', payload: word })
    },
    [dispatch],
  )
}

export function useRandomizeWord() {
  const { list } = useDictionary()
  const dispatch = useWordDispatch()

  return useCallback(() => {
    if (!list.length) {
      return
    }
    const randomIndex = Math.floor(Math.random() * list.length)
    dispatch({ type: 'SET_WORD', payload: list[randomIndex] })
  }, [list, dispatch])
}
