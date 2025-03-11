import useSubmitGuessInput from '../hooks/submit-guess-input'
import { useGameMode } from '../state/mode'
import { useSetSettings, useSettings } from '../state/settings'
import { useEffect, useRef } from 'react'

export default function Timer() {
  const progressRef = useRef<HTMLDivElement>(null)
  const { time } = useSettings()
  const setSettings = useSetSettings()
  const gameMode = useGameMode()
  const timerRef = useRef<number | null>(null)

  const originalTime =
    gameMode === 'rush'
      ? 10
      : gameMode === 'sprint'
        ? 60
        : Number.POSITIVE_INFINITY

  const submitGuessInput = useSubmitGuessInput()

  useEffect(() => {
    if (time === Number.POSITIVE_INFINITY) {
      return
    }

    if (time > 0) {
      timerRef.current = setInterval(() => {
        const newTime = time - 1
        setSettings((prev) => ({ ...prev, time: newTime }))
        progressRef.current?.style.setProperty(
          '--progress',
          `${(newTime / originalTime) * 100}%`,
        )
        if (newTime === 0) {
          submitGuessInput('')
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
        }
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [time, submitGuessInput, setSettings, originalTime])

  if (time === Number.POSITIVE_INFINITY) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-primary/5">
      <div
        className="absolute top-0 left-0 h-full transition-[width] duration-1000 bg-primary w-[var(--progress,100%)]"
        ref={progressRef}
      />
    </div>
  )
}
