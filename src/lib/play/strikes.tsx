import { useEffect, useRef, useState } from 'react'
import { useSettings } from '../state/game'

export default function Strikes() {
  const { strikes } = useSettings()
  const [isStriking, setIsStriking] = useState(false)
  const prevStrikes = useRef(strikes)

  useEffect(() => {
    if (strikes < prevStrikes.current && strikes !== Number.POSITIVE_INFINITY) {
      setIsStriking(true)
      const timer = setTimeout(() => setIsStriking(false), 400)
      return () => clearTimeout(timer)
    }
    prevStrikes.current = strikes
  }, [strikes])

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
      ❤️ × {strikes === Number.POSITIVE_INFINITY ? '∞' : strikes}
    </div>
  )
}
