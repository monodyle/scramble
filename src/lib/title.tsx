import { useStartGame } from './controls/start-game'

export default function TitleScreen() {
  const start = useStartGame()

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl font-semibold text-center">
        {'Scramble!'.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform hover:scale-110"
            style={{
              transform: `rotate(${Math.sin(i * 1.5) * 8}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
      <h2 className="font-serif text-xl font-bold text-center text-primary">
        Game Modes
      </h2>
      <div className="px-4 md:px-24">
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-2">
          <button
            type="button"
            onClick={() => start('chill')}
            className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
          >
            <h3 className="font-serif text-lg font-semibold text-primary">
              Chilling
            </h3>
            <p className="text-sm text-primary/60 text-balance">
              Unlimited guesses - Perfect for learning and practice!
            </p>
          </button>
          <button
            type="button"
            onClick={() => start('strike')}
            className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
          >
            <h3 className="font-serif text-lg font-semibold text-primary">
              Three Strikes
            </h3>
            <p className="text-sm text-primary/60 text-balance">
              3 strikes, that's it, and you're out
            </p>
          </button>
          <button
            type="button"
            onClick={() => start('rush')}
            className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
          >
            <h3 className="font-serif text-lg font-semibold text-primary">
              Rush Riddle
            </h3>
            <p className="text-sm text-primary/60 text-balance">
              10 seconds for each riddle, also 3 strikes
            </p>
          </button>
          <button
            type="button"
            onClick={() => start('sprint')}
            className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
          >
            <h3 className="font-serif text-lg font-semibold text-primary">
              Sprinter
            </h3>
            <p className="text-sm text-primary/60 text-balance">
              Try to survive with one strike for 60 seconds
            </p>
          </button>
        </div>
      </div>
      <div className="h-24" />
    </div>
  )
}
