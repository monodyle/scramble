import { createContext, useContext, useReducer, useCallback } from 'react'
import { useSetGuessState } from './guess'

type InputState = {
  input: string
  usedIndices: number[]
}

type InputAction =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_USED_INDICES'; payload: number[] }
  | { type: 'ADD_USED_INDEX'; payload: number }
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
    case 'ADD_USED_INDEX':
      return { ...state, usedIndices: [...state.usedIndices, action.payload] }
    case 'RESET_INPUT':
      return initialState
    default:
      return state
  }
}

const InputContext = createContext<{
  state: InputState
  dispatch: React.Dispatch<InputAction>
} | null>(null)

export function InputProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(inputReducer, initialState)

  return (
    <InputContext.Provider value={{ state, dispatch }}>
      {children}
    </InputContext.Provider>
  )
}

export function useInputState() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInputState must be used within an InputProvider')
  }
  return context.state
}

export function useInputDispatch() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInputDispatch must be used within an InputProvider')
  }
  return context.dispatch
}

export function useInput() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInput must be used within an InputProvider')
  }
  return context.state
}

export function useInputActions() {
  const dispatch = useInputDispatch()

  return {
    setInput: useCallback(
      (input: string) => {
        dispatch({ type: 'SET_INPUT', payload: input })
      },
      [dispatch],
    ),

    setUsedIndices: useCallback(
      (indices: number[]) => {
        dispatch({ type: 'SET_USED_INDICES', payload: indices })
      },
      [dispatch],
    ),

    addUsedIndex: useCallback(
      (index: number) => {
        dispatch({ type: 'ADD_USED_INDEX', payload: index })
      },
      [dispatch],
    ),

    resetInput: useCallback(() => {
      dispatch({ type: 'RESET_INPUT' })
    }, [dispatch]),
  }
}

export function useResetGuessInput() {
  const setGuessState = useSetGuessState()
  const { setInput, setUsedIndices } = useInputActions()

  return useCallback(() => {
    setUsedIndices([])
    setInput('')
    setGuessState('idle')
  }, [setGuessState, setInput, setUsedIndices])
}
