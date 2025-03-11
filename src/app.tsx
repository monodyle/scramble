import GameOverScreen from './lib/game-over'
import Layout from './lib/layout'
import { useGameMode } from './lib/state/mode'
import TitleScreen from './lib/title'

export default function App() {
  const mode = useGameMode()

  return (
    <Layout>
      {mode === null && <TitleScreen />}
      {mode !== null && <GameOverScreen />}
    </Layout>
  )
}
