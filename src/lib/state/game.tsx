import { createContext, useContext, useReducer, useCallback } from 'react'

export type GameMode = 'chill' | 'strike' | 'rush' | 'sprint' | null
export type GameStage = 'title' | 'play' | 'pause' | 'over'

type GameState = {
  mode: GameMode
  stage: GameStage
  score: number
  strikes: number
  time: number
}

type GameAction =
  | { type: 'SET_MODE'; payload: GameMode }
  | { type: 'SET_STAGE'; payload: GameStage }
  | { type: 'INCREMENT_SCORE' }
  | { type: 'SET_STRIKES'; payload: number }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  mode: null,
  stage: 'title',
  score: 0,
  strikes: 3,
  time: 10,
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload }
    case 'SET_STAGE':
      return { ...state, stage: action.payload }
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 }
    case 'SET_STRIKES':
      return { ...state, strikes: action.payload }
    case 'SET_TIME':
      return { ...state, time: action.payload }
    case 'RESET_GAME':
      return initialState
    default:
      return state
  }
}

const GameStateContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
}>({
  state: initialState,
  dispatch: () => {
    throw new Error(
      'GameStateContext dispatch must be used within a GameStateProvider',
    )
  },
})

export function GameStateProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useResetGame() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [dispatch])
}

export function useSetGameMode() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(
    (mode: GameMode) => {
      dispatch({ type: 'SET_MODE', payload: mode })
    },
    [dispatch],
  )
}

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

export function useStrikes() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useStrikes must be used within a GameStateProvider')
  }
  return context.state.strikes
}

export function useTime() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useTime must be used within a GameStateProvider')
  }
  return context.state.time
}

export function useSetDefaultSettings() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(
    (mode: GameMode) => {
      if (mode === 'chill') {
        dispatch({ type: 'SET_STRIKES', payload: Number.POSITIVE_INFINITY })
        dispatch({ type: 'SET_TIME', payload: Number.POSITIVE_INFINITY })
      } else if (mode === 'strike') {
        dispatch({ type: 'SET_STRIKES', payload: 3 })
        dispatch({ type: 'SET_TIME', payload: Number.POSITIVE_INFINITY })
      } else if (mode === 'rush') {
        dispatch({ type: 'SET_STRIKES', payload: 3 })
        dispatch({ type: 'SET_TIME', payload: 10 })
      } else if (mode === 'sprint') {
        dispatch({ type: 'SET_STRIKES', payload: 1 })
        dispatch({ type: 'SET_TIME', payload: 60 })
      }
    },
    [dispatch],
  )
}

export function useResetTimer() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(() => {
    dispatch({ type: 'SET_TIME', payload: 10 })
  }, [dispatch])
}

export function useSetGameStage() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(
    (stage: GameStage) => {
      dispatch({ type: 'SET_STAGE', payload: stage })
    },
    [dispatch],
  )
}

export function useStrike() {
  const { dispatch } = useContext(GameStateContext)
  const strikes = useStrikes()
  const setGameStage = useSetGameStage()

  return useCallback(() => {
    const newStrikes = strikes - 1
    if (newStrikes === 0) {
      setGameStage('over')
    } else {
      dispatch({ type: 'SET_STRIKES', payload: newStrikes })
    }

    return newStrikes
  }, [dispatch, strikes, setGameStage])
}

export function useIncrementScore() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(() => {
    dispatch({ type: 'INCREMENT_SCORE' })
  }, [dispatch])
}
