import { createContext, useContext, useReducer, useCallback } from 'react'
import { useSetGuessState } from './guess'

// TODO: use array from the scrambled word might be better
type InputState = {
  input: string
  usedIndices: number[]
}

type InputAction =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_USED_INDICES'; payload: number[] }
  | { type: 'RESET_INPUT' }

const initialState: InputState = {
  input: '',
  usedIndices: [],
}

function inputReducer(state: InputState, action: InputAction): InputState {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload }
    case 'SET_USED_INDICES':
      return { ...state, usedIndices: action.payload }
    case 'RESET_INPUT':
      return initialState
    default:
      return state
  }
}

const InputContext = createContext<{
  state: InputState
  dispatch: React.Dispatch<InputAction>
}>({
  state: initialState,
  dispatch: () => {
    throw new Error(
      'InputContext dispatch must be used within an InputProvider',
    )
  },
})

export function InputProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(inputReducer, initialState)

  return (
    <InputContext.Provider value={{ state, dispatch }}>
      {children}
    </InputContext.Provider>
  )
}

export function useInput() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInput must be used within an InputProvider')
  }
  return context.state
}

export function useSetInput() {
  const { dispatch } = useContext(InputContext)

  return useCallback(
    (input: string) => {
      dispatch({ type: 'SET_INPUT', payload: input })
    },
    [dispatch],
  )
}

export function useSetUsedIndices() {
  const { dispatch } = useContext(InputContext)

  return useCallback(
    (indices: number[]) => {
      dispatch({ type: 'SET_USED_INDICES', payload: indices })
    },
    [dispatch],
  )
}

export function useResetGuessInput() {
  const setGuessState = useSetGuessState()
  const { dispatch } = useContext(InputContext)

  return useCallback(() => {
    dispatch({ type: 'RESET_INPUT' })
    setGuessState('idle')
  }, [dispatch, setGuessState])
}
