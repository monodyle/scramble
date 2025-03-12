import GameOverScreen from './lib/game-over'
import PlayScreen from './lib/play'
import { useGameState } from './lib/state/stage'
import TitleScreen from './lib/title'

export default function App() {
  const state = useGameState()

  return (
    <>
      {state === 'title' && <TitleScreen />}
      {state === 'play' && <PlayScreen />}
      {state === 'over' && <GameOverScreen />}
    </>
  )
}
