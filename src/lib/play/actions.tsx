import { ArrowLeft, CircleHelp, Volume2 } from 'lucide-react'
import useBackToTitle from '../hooks/back-to-title'

export default function Actions() {
  const back = useBackToTitle()

  return (
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
  )
}
