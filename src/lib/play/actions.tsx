import { ArrowLeft, Volume2, VolumeX } from 'lucide-react'
import useBackToTitle from '../hooks/back-to-title'
import { useSound } from '../sound'

export default function Actions() {
  const back = useBackToTitle()
  const { isMuted, toggleMute } = useSound()

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
        onClick={toggleMute}
        className="p-1 bg-transparent border-none text-primary/60 hover:text-primary"
      >
        {isMuted ? (
          <VolumeX className="size-5" />
        ) : (
          <Volume2 className="size-5" />
        )}
      </button>
    </div>
  )
}
