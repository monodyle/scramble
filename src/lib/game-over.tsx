import useBackToTitle from './hooks/back-to-title'

export default function GameOverScreen() {
  const backToTitle = useBackToTitle()

  return (
    <div className="text-center">
      <h1 className="font-serif text-3xl font-semibold text-center text-primary">
        Game Over!
      </h1>
      <p className="w-2/3 mx-auto text-balance text-primary/60">
        You've used all your lives. Better luck next time!
      </p>
      <div className="flex flex-col items-center gap-2 py-4">
        <button
          type="button"
          className="px-4 py-1.5 font-serif font-semibold transition-colors transform rounded-lg text-elevated bg-primary hover:bg-primary/80 w-36"
        >
          Play Again
        </button>
        <button
          type="button"
          className="px-4 py-1.5 font-serif font-semibold transition-colors transform rounded-lg text-primary bg-primary/4 hover:bg-primary/8 w-36"
          onClick={backToTitle}
        >
          Back to Title
        </button>
      </div>
    </div>
  )
}
