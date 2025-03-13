import { ArrowLeft, Volume2, VolumeX } from 'lucide-react'
import { useSound } from '../sound'
import { useSetGameStage } from '../state/game'

export default function Actions() {
  const setGameStage = useSetGameStage()
  const { isMuted, toggleMute } = useSound()

  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={() => setGameStage('title')}
        aria-label="Back to title"
        className="p-1 bg-transparent border-none text-primary/60 hover:text-primary"
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={toggleMute}
        aria-label="Toggle sound"
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
