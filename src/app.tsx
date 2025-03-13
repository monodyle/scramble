import GameOverScreen from './lib/game-over'
import PlayScreen from './lib/play'
import { useGameSetup } from './lib/state/game'
import TitleScreen from './lib/title'

export default function App() {
  const { stage } = useGameSetup()

  return (
    <>
      {stage === 'title' && <TitleScreen />}
      {stage === 'play' && <PlayScreen />}
      {stage === 'over' && <GameOverScreen />}
    </>
  )
}
