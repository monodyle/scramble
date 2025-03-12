import useBackToTitle from './hooks/back-to-title'
import useStartGame from './hooks/start-game'
import { useGameMode } from './state/mode'
import { useScore } from './state/score'

export default function GameOverScreen() {
  const backToTitle = useBackToTitle()
  const gameMode = useGameMode()
  const startGame = useStartGame()
  const score = useScore()

  return (
    <div className="text-center">
      <h1 className="font-serif text-3xl font-semibold text-center text-primary">
        Game Over!
      </h1>
      <p className="text-primary/60">Better luck next time!</p>

      <div className="py-9">
        <p className="text-sm font-medium uppercase">Score</p>
        <p className="text-7xl font-serif font-semibold">{score}</p>
      </div>

      <div className="flex flex-col items-center gap-2 py-4">
        <button
          type="button"
          className="px-4 py-1.5 font-serif font-semibold transition-colors transform rounded-lg text-elevated bg-primary hover:bg-primary/80 w-36"
          onClick={() => startGame(gameMode)}
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
