import { useGuessState } from '../state/guess'

export default function Message() {
  const guessState = useGuessState()

  const message = {
    idle: 'Hm... 🤔',
    correct: 'Correct! 🎉',
    incorrect: 'Try again! 😳',
  }[guessState]

  const className = {
    idle: 'text-primary',
    correct: 'text-green',
    incorrect: 'text-red',
  }[guessState]

  return (
    <div
      className={['flex items-center justify-center gap-1', className].join(
        ' ',
      )}
    >
      {message}
    </div>
  )
}
