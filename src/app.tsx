import GameOverScreen from './lib/game-over'
import Layout from './lib/layout'
import PlayScreen from './lib/play'
import { useGameState } from './lib/state/stage'
import TitleScreen from './lib/title'

export default function App() {
  const state = useGameState()

  return (
    <Layout>
      {state === 'title' && <TitleScreen />}
      {(state === 'play' || state === 'pause') && <PlayScreen />}
      {state === 'over' && <GameOverScreen />}
    </Layout>
  )
}
