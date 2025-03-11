import { useWord } from '../state/word'

export default function Scrambled() {
  const { scrambled } = useWord()

  return (
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
  )
}
