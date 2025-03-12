import GameOverScreen from './lib/game-over'
import PlayScreen from './lib/play'
import { useGameState } from './lib/state/game'
import TitleScreen from './lib/title'

export default function App() {
  const { stage } = useGameState()

  return (
    <>
      {stage === 'title' && <TitleScreen />}
      {stage === 'play' && <PlayScreen />}
      {stage === 'over' && <GameOverScreen />}
    </>
  )
}
