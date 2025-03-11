import { useSettings } from '../state/settings'
import { useEffect, useRef, useState } from 'react'

export default function Timer() {
  const progressRef = useRef<HTMLDivElement>(null)
  const { time } = useSettings()
  const [seconds, setSeconds] = useState(time)

  useEffect(() => {
    if (seconds === Number.POSITIVE_INFINITY) {
      return
    }

    if (seconds > 0) {
      const interval = setInterval(() => {
        const newSeconds = seconds - 1
        setSeconds(newSeconds)
        progressRef.current?.style.setProperty(
          '--progress',
          `${(newSeconds / time) * 100}%`,
        )
        if (newSeconds === 0) {
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [seconds, time])

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
