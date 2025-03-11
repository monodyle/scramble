import { ArrowLeft, CircleHelp, Volume2 } from 'lucide-react'
import { useSettings } from './state/settings'
import { useWord } from './state/word'
import { useBack } from './hooks/back'

export default function PlayScreen() {
  const { strikes } = useSettings()
  const { word, scrambled } = useWord()
  const back = useBack()

  return (
    <div className="flex-1 w-full h-full space-y-4">
      <div className="flex items-center justify-between w-full gap-2 p-4">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={back}
            className="p-1 bg-transparent border-none text-primary/60 hover:text-primary"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            className="p-1 bg-transparent border-none text-primary/60 hover:text-primary"
          >
            <Volume2 className="size-5" />
          </button>
          <button
            type="button"
            className="p-1 bg-transparent border-none text-primary/60 hover:text-primary"
          >
            <CircleHelp className="size-5" />
          </button>
        </div>
        <div className="font-serif font-medium">Score: 0</div>
        <div>❤️ × {strikes === Number.POSITIVE_INFINITY ? '∞' : strikes}</div>
      </div>
      <div className="h-32" />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: word.length }).map((_, index) => (
            <div
              key={index}
              className={[
                'text-xl size-12 rounded-lg font-semibold select-none flex items-center justify-center border-2 text-violet',
                index === 0
                  ? 'border-violet bg-violet/5'
                  : 'border-violet/20 bg-violet/5',
              ].join(' ')}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-1">
          {scrambled.split('').map((char, index) => (
            <button
              type="button"
              key={index}
              aria-label={`Select letter ${char}`}
              className={[
                'text-xl size-12 rounded-lg font-semibold select-none flex items-center justify-center cursor-pointer transition-all disabled:cursor-default',
                'bg-violet/20 text-violet hover:bg-violet/30 focus:ring-2 focus:ring-violet focus:outline-none',
              ].join(' ')}
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
