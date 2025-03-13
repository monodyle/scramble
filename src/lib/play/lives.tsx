import { useEffect, useRef, useState } from 'react'
import { useLives } from '../state/game'

export default function Lives() {
  const lives = useLives()
  const [isStriking, setIsStriking] = useState(false)
  const prevLives = useRef(lives)

  useEffect(() => {
    if (lives < prevLives.current && lives !== Number.POSITIVE_INFINITY) {
      setIsStriking(true)
      const timer = setTimeout(() => setIsStriking(false), 400)
      return () => clearTimeout(timer)
    }
    prevLives.current = lives
  }, [lives])

  return (
    <div
      className={[
        'transition-[transform,color]',
        isStriking
          ? 'animate-[shake_200ms_ease-in-out_1_alternate] text-red'
          : '',
      ].join(' ')}
    >
      {isStriking && (
        <span className="absolute animate-[slide-out_400ms_ease-in-out_1_alternate]">
          💔
        </span>
      )}
      ❤️ × {lives === Number.POSITIVE_INFINITY ? '∞' : lives}
    </div>
  )
}
