import { createContext, useContext, useState } from 'react'

const InputContext = createContext<{
  input: string
  usedIndices: number[]
}>({
  input: '',
  usedIndices: [],
})
const InputContextSetter = createContext<{
  setInput: React.Dispatch<React.SetStateAction<string>>
  setUsedIndices: React.Dispatch<React.SetStateAction<Array<number>>>
}>({
  setInput: () => {},
  setUsedIndices: () => {},
})

export function InputProvider({ children }: React.PropsWithChildren) {
  const [input, setInput] = useState('')
  const [usedIndices, setUsedIndices] = useState<number[]>([])

  return (
    <InputContext.Provider value={{ input, usedIndices }}>
      <InputContextSetter.Provider value={{ setInput, setUsedIndices }}>
        {children}
      </InputContextSetter.Provider>
    </InputContext.Provider>
  )
}

export function useInput() {
  return useContext(InputContext)
}

export function useInputActions() {
  return useContext(InputContextSetter)
}
