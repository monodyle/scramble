import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { useDictionary } from './dictionary'
import { useResetGuessInput } from './input'

type WordState = {
  word: string
  scrambled: string
}

type WordAction =
  | { type: 'SET_WORD'; payload: string }
  | { type: 'SCRAMBLE_WORD' }

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
    default:
      return state
  }
}

const WordContext = createContext<{
  state: WordState
  dispatch: React.Dispatch<WordAction>
}>({
  state: initialState,
  dispatch: () => {
    throw new Error('WordContext dispatch must be used within a WordProvider')
  },
})

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
  const { state } = useContext(WordContext)
  return state
}

export function useNextWord() {
  const resetGuessInput = useResetGuessInput()
  const { list } = useDictionary()
  const { dispatch } = useContext(WordContext)

  return useCallback(() => {
    if (!list.length) return
    const randomIndex = Math.floor(Math.random() * list.length)
    resetGuessInput()
    dispatch({ type: 'SET_WORD', payload: list[randomIndex] })
  }, [resetGuessInput, list, dispatch])
}
