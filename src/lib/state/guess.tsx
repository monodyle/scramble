import { createContext, useContext, useReducer, useCallback } from 'react'

export type GuessState = 'idle' | 'correct' | 'incorrect'

type GuessContextState = {
  state: GuessState
}

type GuessAction =
  | { type: 'SET_GUESS_STATE'; payload: GuessState }
  | { type: 'RESET_GUESS' }

const initialState: GuessContextState = {
  state: 'idle',
}

function guessReducer(
  state: GuessContextState,
  action: GuessAction,
): GuessContextState {
  switch (action.type) {
    case 'SET_GUESS_STATE':
      return { ...state, state: action.payload }
    case 'RESET_GUESS':
      return initialState
    default:
      return state
  }
}

const GuessContext = createContext<{
  state: GuessContextState
  dispatch: React.Dispatch<GuessAction>
}>({
  state: initialState,
  dispatch: () => {
    throw new Error(
      'GuessContext dispatch must be used within a GuessStateProvider',
    )
  },
})

export function GuessStateProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(guessReducer, initialState)

  return (
    <GuessContext.Provider value={{ state, dispatch }}>
      {children}
    </GuessContext.Provider>
  )
}

export function useGuessState() {
  const context = useContext(GuessContext)
  if (!context) {
    throw new Error('useGuessState must be used within a GuessStateProvider')
  }
  return context.state.state
}

export function useSetGuessState() {
  const { dispatch } = useContext(GuessContext)

  return useCallback(
    (state: GuessState) => {
      dispatch({ type: 'SET_GUESS_STATE', payload: state })
    },
    [dispatch],
  )
}

export function useResetGuessState() {
  const { dispatch } = useContext(GuessContext)

  return useCallback(() => {
    dispatch({ type: 'RESET_GUESS' })
  }, [dispatch])
}
