import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

const SoundContext = createContext<{
  isMuted: boolean
  play: (sound: 'correct' | 'incorrect' | 'complete') => void
  toggleMute: () => void
}>({
  play: () => {},
  toggleMute: () => {},
  isMuted: false,
})

const correctSound = new Audio('/sounds/duolingo-correct.mp3')
const incorrectSound = new Audio('/sounds/duolingo-incorrect.mp3')
const completeSound = new Audio('/sounds/duolingo-complete.mp3')

export function SoundProvider({ children }: React.PropsWithChildren) {
  const [isMuted, toggleMute] = useReducer((state) => !state, false)

  const play = useCallback(
    (sound: 'correct' | 'incorrect' | 'complete') => {
      if (isMuted) {
        return
      }

      if (sound === 'correct') {
        correctSound.play()
      } else if (sound === 'incorrect') {
        incorrectSound.play()
      } else if (sound === 'complete') {
        completeSound.play()
      }
    },
    [isMuted],
  )

  const value = useMemo(() => ({ play, isMuted, toggleMute }), [play, isMuted])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  return useContext(SoundContext)
}
