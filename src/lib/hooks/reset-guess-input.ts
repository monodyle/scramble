import { useCallback } from 'react'
import { useSetGuessState } from '../state/guess'
import { useInputActions } from '../state/input'

export default function useResetGuessInput() {
  const setGuessState = useSetGuessState()
  const { setInput, setUsedIndices } = useInputActions()

  return useCallback(() => {
    setUsedIndices([])
    setInput('')
    setGuessState('idle')
  }, [setGuessState, setInput, setUsedIndices])
}
