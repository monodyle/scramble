import GameOverScreen from './lib/game-over'
import PlayScreen from './lib/play'
import { useGameStage } from './lib/state/game'
import TitleScreen from './lib/title'

export default function App() {
  const stage = useGameStage()

  return (
    <>
      {stage === 'title' && <TitleScreen />}
      {stage === 'play' && <PlayScreen />}
      {stage === 'over' && <GameOverScreen />}
    </>
  )
}
