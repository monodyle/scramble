import { createContext, useContext, useReducer, useCallback } from 'react'
import { useResetScore } from './score'

export type GameMode = 'chill' | 'strike' | 'rush' | 'sprint' | null
export type GameStage = 'title' | 'play' | 'pause' | 'over'

type GameState = {
  mode: GameMode
  stage: GameStage
  lives: number
  time: number
}

type GameAction =
  | { type: 'SET_MODE'; payload: GameMode }
  | { type: 'SET_STAGE'; payload: GameStage }
  | { type: 'SET_LIVES'; payload: number }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  mode: null,
  stage: 'title',
  lives: 3,
  time: 10,
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload }
    case 'SET_STAGE':
      return { ...state, stage: action.payload }
    case 'SET_LIVES':
      return { ...state, lives: action.payload }
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
  const resetScore = useResetScore()

  return useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
    resetScore()
  }, [dispatch, resetScore])
}

export function useSetGameMode() {
  const { dispatch } = useContext(GameStateContext)

  return useCallback(
    (mode: GameMode) => {
      dispatch({ type: 'SET_MODE', payload: mode })
      if (mode === 'chill') {
        dispatch({ type: 'SET_LIVES', payload: Number.POSITIVE_INFINITY })
        dispatch({ type: 'SET_TIME', payload: Number.POSITIVE_INFINITY })
      } else if (mode === 'strike') {
        dispatch({ type: 'SET_LIVES', payload: 3 })
        dispatch({ type: 'SET_TIME', payload: Number.POSITIVE_INFINITY })
      } else if (mode === 'rush') {
        dispatch({ type: 'SET_LIVES', payload: 3 })
        dispatch({ type: 'SET_TIME', payload: 10 })
      } else if (mode === 'sprint') {
        dispatch({ type: 'SET_LIVES', payload: 1 })
        dispatch({ type: 'SET_TIME', payload: 60 })
      }
    },
    [dispatch],
  )
}

export function useGameSetup() {
  const { state } = useContext(GameStateContext)
  return state
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
  const { lives } = useGameSetup()

  return useCallback(() => {
    const newLives = lives - 1
    dispatch({ type: 'SET_LIVES', payload: newLives })
    return newLives
  }, [dispatch, lives])
}
