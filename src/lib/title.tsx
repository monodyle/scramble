export default function TitleScreen() {
  const selectMode = console.log

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
      <div className="h-9" />
      <h2 className="font-serif text-xl font-bold text-center text-primary">
        Game Modes
      </h2>
      <div className="flex flex-col w-full gap-4">
        <button
          type="button"
          onClick={() => selectMode('chill')}
          className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
        >
          <h3 className="font-serif text-lg font-semibold text-primary">
            Chill
          </h3>
          <p className="w-2/3 mx-auto text-sm text-primary/60 text-balance">
            Unlimited guesses - Perfect for learning and practice!
          </p>
        </button>
        <button
          type="button"
          onClick={() => selectMode('medium')}
          className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
        >
          <h3 className="font-serif text-lg font-semibold text-primary">
            Medium
          </h3>
          <p className="w-2/3 mx-auto text-sm text-primary/60 text-balance">
            3 lives - Test your skills with limited chances!
          </p>
        </button>
        <button
          type="button"
          onClick={() => selectMode('challenge')}
          className="px-4 py-2 transition-colors transform border border-transparent rounded-lg bg-primary/4 hover:border-border hover:bg-primary/8"
        >
          <h3 className="font-serif text-lg font-semibold text-primary">
            Challenger
          </h3>
          <p className="w-2/3 mx-auto text-sm text-primary/60 text-balance">
            3 lives and 30 seconds - Race against the clock!
          </p>
        </button>
      </div>
      <div className="h-24" />
    </div>
  )
}
