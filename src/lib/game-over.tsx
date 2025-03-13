import { useEffect } from 'react'
import { useStartGame } from './controls/start-game'
import { useSetGameStage, useGameSetup } from './state/game'
import JSConfetti from 'js-confetti'
import { useSound } from './sound'
import { useScore } from './state/score'

export default function GameOverScreen() {
  const setGameStage = useSetGameStage()
  const { mode } = useGameSetup()
  const startGame = useStartGame()
  const { play } = useSound()
  const score = useScore()

  useEffect(() => {
    play('complete')
    const confetti = new JSConfetti()
    confetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    })
  }, [play])

  return (
    <div className="text-center" id="game-over-confetti">
      <h1 className="font-serif text-3xl font-semibold text-center text-primary">
        Game Over!
      </h1>
      <p className="text-primary/60">Better luck next time!</p>

      <div className="py-9">
        <p className="text-sm font-medium uppercase">Score</p>
        <p className="text-7xl font-serif font-semibold">{score.current}</p>
        <p className="font-medium font-serif">Best: {score.highest}</p>
      </div>

      <div className="flex flex-col items-center gap-2 py-4">
        <button
          type="button"
          className="px-4 py-1.5 font-serif font-semibold transition-colors transform rounded-lg text-elevated bg-primary hover:bg-primary/80 w-36"
          onClick={() => startGame(mode)}
        >
          Play Again
        </button>
        <button
          type="button"
          className="px-4 py-1.5 font-serif font-semibold transition-colors transform rounded-lg text-primary bg-primary/4 hover:bg-primary/8 w-36"
          onClick={() => setGameStage('title')}
        >
          Back to Title
        </button>
      </div>
    </div>
  )
}
