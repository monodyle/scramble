import { useWord } from '../state/word'

export default function Input() {
  const { word } = useWord()

  return (
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
  )
}
