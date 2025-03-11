import { GameModeProvider } from './mode'

export default function Providers({ children }: React.PropsWithChildren) {
  return <GameModeProvider>{children}</GameModeProvider>
}
