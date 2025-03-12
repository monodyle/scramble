import useSubmitGuessInput from '../hooks/submit-guess-input'
import { useEffect, useRef, useState } from 'react'
import { useWord } from '../state/word'
import { useGameMode, useTime } from '../state/game'

function Progression() {
  const progressRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  const time = useTime()
  const [timeLeft, setTimeLeft] = useState(time)

  const submitGuessInput = useSubmitGuessInput()

  useEffect(() => {
    if (timeLeft === Number.POSITIVE_INFINITY) {
      return
    }

    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        const newTime = timeLeft - 1
        setTimeLeft(newTime)
        progressRef.current?.style.setProperty(
          '--progress',
          `${(newTime / time) * 100}%`,
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
  }, [time, submitGuessInput, timeLeft])

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

export default function Timer() {
  const gameMode = useGameMode()
  const { word } = useWord()

  if (gameMode === 'rush') {
    return <Progression key={word} />
  }

  if (gameMode === 'sprint') {
    return <Progression />
  }
}
