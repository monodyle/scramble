import { createContext, useContext, useReducer, useCallback } from 'react'

export type GameMode = 'chill' | 'strike' | 'rush' | 'sprint' | null
export type GameStage = 'title' | 'play' | 'pause' | 'over'

interface GameState {
  mode: GameMode
  stage: GameStage
  score: number
  settings: {
    strikes: number
    time: number
  }
}

type GameAction =
  | { type: 'SET_MODE'; payload: GameMode }
  | { type: 'SET_STAGE'; payload: GameStage }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'INCREMENT_SCORE' }
  | { type: 'RESET_SCORE' }
  | { type: 'UPDATE_SETTINGS'; payload: { strikes: number; time: number } }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  mode: null,
  stage: 'title',
  score: 0,
  settings: {
    strikes: 3,
    time: 10,
  },
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload }
    case 'SET_STAGE':
      return { ...state, stage: action.payload }
    case 'SET_SCORE':
      return { ...state, score: action.payload }
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 }
    case 'RESET_SCORE':
      return { ...state, score: 0 }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.payload }
    case 'RESET_GAME':
      return initialState
    default:
      return state
  }
}

const GameStateContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameStateProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context.state
}

export function useGameDispatch() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameDispatch must be used within a GameStateProvider')
  }
  return context.dispatch
}

// Convenience hooks for specific state updates
export function useGameMode() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameMode must be used within a GameStateProvider')
  }
  return context.state.mode
}

export function useGameStage() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameStage must be used within a GameStateProvider')
  }
  return context.state.stage
}

export function useScore() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useScore must be used within a GameStateProvider')
  }
  return context.state.score
}

export function useSettings() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useSettings must be used within a GameStateProvider')
  }
  return context.state.settings
}

export function useSetDefaultSettings() {
  const dispatch = useGameDispatch()

  return useCallback(
    (mode: GameMode) => {
      if (mode === 'chill') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: {
            strikes: Number.POSITIVE_INFINITY,
            time: Number.POSITIVE_INFINITY,
          },
        })
      } else if (mode === 'strike') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 3, time: Number.POSITIVE_INFINITY },
        })
      } else if (mode === 'rush') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 3, time: 10 },
        })
      } else if (mode === 'sprint') {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { strikes: 1, time: 60 },
        })
      }
    },
    [dispatch],
  )
}
