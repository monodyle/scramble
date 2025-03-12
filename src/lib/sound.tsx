import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

const SoundContext = createContext<{
  isMuted: boolean
  play: (sound: 'correct' | 'incorrect') => void
  toggleMute: () => void
}>({
  play: () => {},
  toggleMute: () => {},
  isMuted: false,
})

export function SoundProvider({ children }: React.PropsWithChildren) {
  const [isMuted, toggleMute] = useReducer((state) => !state, false)

  const correctSound = useMemo(
    () => new Audio('/sounds/duolingo-correct.mp3'),
    [],
  )
  const incorrectSound = useMemo(
    () => new Audio('/sounds/duolingo-incorrect.mp3'),
    [],
  )

  const play = useCallback(
    (sound: 'correct' | 'incorrect') => {
      if (isMuted) {
        return
      }

      if (sound === 'correct') {
        correctSound.play()
      } else {
        incorrectSound.play()
      }
    },
    [correctSound, incorrectSound, isMuted],
  )

  const value = useMemo(() => ({ play, isMuted, toggleMute }), [play, isMuted])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  return useContext(SoundContext)
}
