import { useEffect } from 'react'
import { useStartGame } from './controls/start-game'
import { useSetGameStage, useGameSetup } from './state/game'
import JSConfetti from 'js-confetti'
import { useSound } from './sound'
import { useScore } from './state/score'
import Name from './name'
import { getModeLabel } from './mode'
import { getHighestScore } from './highest-score'

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
    <div
      className="text-center flex-1 py-12 md:py-24 flex flex-col items-center"
      id="game-over-confetti"
    >
      <Name />
      <div className="bg-primary px-1 rounded text-elevated font-medium text-sm">
        thescramblegame.com
      </div>

      <div className="my-auto">
        <h1 className="font-serif text-2xl font-semibold text-center text-primary">
          Game Over!
        </h1>
        <span className="font-medium font-serif">
          Game mode: {getModeLabel(mode)}
        </span>
        <p className="font-medium font-serif">Your score was:</p>
        <p className="text-7xl font-serif font-semibold relative py-3">
          {score}
        </p>
        <p className="font-medium font-serif">
          Best Score: {getHighestScore(mode)}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 py-4 mt-auto">
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
